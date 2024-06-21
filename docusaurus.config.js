// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Pathfinder百科',
	favicon: 'img/bluebear.ico',

	// Set the production url of your site here
	url: 'https://xiaoxiaomeow.github.io',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/pathfinder',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'xiaoxiaomeow', // Usually your GitHub org/user name.
	projectName: 'pathfinder', // Usually your repo name.

	trailingSlash: false, // as suggested by Github Pages Tutorial
	customFields: {
		// Put your custom environment here
		GIT_USER: "xiaoxiaomeow"
	},

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'zh-Hans',
		locales: ['zh-Hans'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: './sidebars.js',
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl:
					//   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl:
					//   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			// Replace with your project's social card
			// image: 'img/docusaurus-social-card.jpg',
			navbar: {
				title: 'Pathfinder百科',
				logo: {
					alt: 'bluebear',
					src: 'img/bluebear.png',
				},
				items: [
					{
						label: '法术速查',
						position: 'left',
						href: '/spells'
					},
					{
						label: '专长速查',
						position: 'left',
						href: '/feats'
					}
					/*
					{
					type: 'docSidebar',
					sidebarId: 'tutorialSidebar',
					position: 'left',
					label: 'Tutorial',
				  },
				  {to: '/blog', label: 'Blog', position: 'left'},
				  {
					href: 'https://github.com/facebook/docusaurus',
					label: 'GitHub',
					position: 'right',
				  },
				  */
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
					  label: 'Github',
					  href: 'https://github.com/xiaoxiaomeow/pathfinder',
					},
					{
					  label: 'QQ群',
					  href: 'https://qm.qq.com/q/PmQKhICTWE',
					},
					{
					  label: '邮件',
					  href: 'mailto:xiaoxiaocat@foxmail.com',
					}
				  ],
				copyright: 'Built with <a href="https://docusaurus.io/">Docusaurus</a>.'
			},
			prism: {
				theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
			}
		}),
};

export default config;
