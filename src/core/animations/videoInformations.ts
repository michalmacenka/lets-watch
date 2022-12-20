// @ts-ignore
import gsap from 'gsap/dist/gsap';

export default () => {
	gsap.from('.infoSlide', {
		autoAlpha: 0,
		x: -40,
		duration: 0.4,
		delay: 0.8,
		stagger: 0.15
	});
};
