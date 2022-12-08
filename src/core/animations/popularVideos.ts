// @ts-ignore
import gsap from 'gsap/dist/gsap';
// @ts-ignore
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';

export default () => {
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.batch('.popularVideo', {
		onEnter: (elements: HTMLElement) => {
			gsap.from(elements, {
				autoAlpha: 0,
				y: 40,
				stagger: 0.15
			});
		},
		once: true
	});
};
