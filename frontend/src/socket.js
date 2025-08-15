import { io } from 'socket.io-client'
import { getCachedListResource } from 'frappe-ui/src/resources/listResource'
import { getCachedResource } from 'frappe-ui/src/resources/resources'

// 開発環境用のSocket実装
export function initSocket() {
	// スタンドアロン開発環境では、Socket.IOサーバーが存在しない場合がある
	// そのため、接続エラーを適切にハンドリングする
	
	console.info('Initializing socket connection...');
	
	// デフォルト設定
	let host = window.location.hostname;
	let siteName = window.site_name || host;
	let socketio_port = 9000;
	let port = window.location.port ? `:${socketio_port}` : '';
	let protocol = port ? 'http' : 'https';
	let url = `${protocol}://${host}${port}/${siteName}`;

	try {
		let socket = io(url, {
			withCredentials: true,
			reconnectionAttempts: 3, // 少なめに設定
			timeout: 5000, // 5秒でタイムアウト
			forceNew: true
		});
		
		// 接続エラーをハンドリング
		socket.on('connect_error', (error) => {
			console.warn('Socket connection failed (expected in standalone development):', error.message);
		});
		
		socket.on('connect', () => {
			console.info('Socket connected successfully');
		});
		
		socket.on('refetch_resource', (data) => {
			if (data.cache_key) {
				let resource =
					getCachedResource(data.cache_key) ||
					getCachedListResource(data.cache_key);
				if (resource) {
					resource.reload();
				}
			}
		});
		
		return socket;
	} catch (error) {
		console.warn('Socket initialization error (expected in development):', error);
		// モックソケットオブジェクトを返す
		return {
			on: () => {},
			emit: () => {},
			disconnect: () => {},
			connected: false
		};
	}
}
