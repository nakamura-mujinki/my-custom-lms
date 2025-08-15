<template>
	<svg
		width="80"
		height="79"
		viewBox="0 0 80 79"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="custom-lms-logo"
	>
		<!-- カスタムロゴデザイン -->
		<rect
			width="80"
			height="79"
			rx="16"
			fill="url(#gradient)"
		/>
		
		<!-- 書籍アイコン -->
		<path
			d="M20 25 L25 20 L55 20 L60 25 L60 55 L55 60 L25 60 L20 55 Z"
			fill="white"
			opacity="0.1"
		/>
		
		<!-- メインブック -->
		<rect
			x="25"
			y="22"
			width="30"
			height="35"
			rx="2"
			fill="white"
		/>
		
		<!-- ページライン -->
		<line x1="30" y1="30" x2="50" y2="30" stroke="#4F46E5" stroke-width="1.5"/>
		<line x1="30" y1="35" x2="50" y2="35" stroke="#4F46E5" stroke-width="1.5"/>
		<line x1="30" y1="40" x2="45" y2="40" stroke="#4F46E5" stroke-width="1.5"/>
		
		<!-- 星 (カスタム要素) -->
		<path
			d="M40 45 L42 49 L46 49 L43 52 L44 56 L40 54 L36 56 L37 52 L34 49 L38 49 Z"
			fill="#F59E0B"
		/>
		
		<defs>
			<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
				<stop offset="50%" style="stop-color:#7C3AED;stop-opacity:1" />
				<stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
			</linearGradient>
		</defs>
	</svg>
</template>
