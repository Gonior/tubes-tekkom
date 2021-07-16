const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");
const plugin = require('tailwindcss/plugin')
module.exports = {
	mode: "aot",
	purge: {
		content: [
			"./src/**/*.{html,js,svelte,ts}",
		],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
			],
			keyframes: true,
		},
	},
	theme: {
		extend: {
			transitionProperty : {
				'width' : 'width'
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		plugin(function({ addUtilities }){
			const newUtilities = {
				'.safe-top' : {
					paddingTop: 'constant(safe-area-inset-top)',
					paddingTop: 'env(safe-area-inset-top)'
				},
				'.safe-left' : {
					paddingLeft: 'constant(safe-area-inset-left)',
					paddingLeft: 'env(safe-area-inset-left)'
				},
				'.safe-right' : {
					paddingRight: 'constant(safe-area-inset-right)',
					paddingRight: 'env(safe-area-inset-right)'
				},
				'.safe-bottom' : {
					paddingBottom: 'constant(safe-area-inset-bottom)',
					paddingBottom: 'env(safe-area-inset-bottom)'
				},
				'.disable-scrollbars' : {
					scrollbarWidth: 'none',
					'-ms-overflow-style': 'none',
					'&::-webkit-scrollbar' : {
						width: '0px',
						background: 'transparent',
						display: 'none'
					},
					'& *::-webkit-scrollbar' : {
						width: '0px',
						background: 'transparent',
						display: 'none'
					},
					'& *' : {
						scrollbarWidth: 'none',
						'-ms-overflow-style': 'none'
					}
				},
					'.no-tap-highlighting': {
					'-webkit-tap-highlight-color': 'transparent'
				}
			}
	
			addUtilities( newUtilities );
		})
	],
};
