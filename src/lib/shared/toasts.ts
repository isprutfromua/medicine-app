import { toast } from '@zerodevx/svelte-toast';
import colors from 'tailwindcss/colors';
import theme from 'tailwindcss/defaultTheme';

export const notify = (msg: string) =>
	toast.push(msg, {
		duration: 2500, // insert new toast to bottom of stack
		intro: { x: 300 }, // user-defined classes
		theme: {
			'--toastBackground': colors.white,
			'--toastColor': colors.gray['500'],
			'--toastBorderRadius': theme.borderRadius['xl'],
			'--toastBarBackground': colors.indigo['600']
		}
	});
