import barba, { type ITransitionData } from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

barba.init({
  transitions: [
    {
      name: 'animation',
      async leave(data) {
        await gsap.to(data.current.container, { opacity: 0, duration: 0.3 });
        //console.log(data);
      },
      async enter(data) {
        await gsap.from(data.next.container, { opacity: 0, duration: 0.3 });
        //console.log(data);
      },
    },
    {
      name: 'contact-animation',
      to: { namespace: ['contact'] },
      sync: true,

      async enter(data) {
        await contactTransition(data);
      },
    },
    {
      name: 'contact-animation',
      from: { namespace: ['contact'] },
      sync: true,

      async enter(data) {
        await contactTransition(data);
      },
    },
  ],
});

// restart Webflow forms
barba.hooks.after(async () => {
  await restartWebflow();
});

const contactTransition = async (data: ITransitionData) => {
  //console.log(data);
  data.next.container.classList.add('transition');

  const currentHeader = data.current.container.querySelector('h1') as HTMLHeadingElement;
  const nextHeader = data.next.container.querySelector('h1') as HTMLHeadingElement;

  // eslint-disable-next-line prettier/prettier
    const currentBall = data.current.container.querySelector('[data-element="ball"]') as HTMLElement;
  const nextBall = data.next.container.querySelector('[data-element="ball"]') as HTMLElement;
  const currentBallParent = currentBall.parentElement as HTMLElement;
  const nextBallParent = nextBall.parentElement as HTMLElement;
  const state = Flip.getState(currentBall);

  currentBallParent.style.height = `${currentBall.offsetHeight}px`;

  nextBall.remove();
  nextBallParent.append(currentBall);

  await Promise.all([
    Flip.from(state, { duration: 1 }),
    gsap.to(currentHeader, { opacity: 0, duration: 0.3 }),
    gsap.from(nextHeader, { opacity: 0, duration: 0.3, delay: 0.3 }),
  ]);

  data.next.container.classList.remove('transition');
};
