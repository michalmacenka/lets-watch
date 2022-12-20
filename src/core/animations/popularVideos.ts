// @ts-ignore
import gsap from 'gsap/dist/gsap';
// @ts-ignore
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';

export default () => {
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.batch('.popularVideo', {
		onEnter: (elements: HTMLElement) => {
			gsap.to(elements, {
				autoAlpha: 1,
				y: 0,
				stagger: 0.15
			});
		},
		once: true
	});
};
