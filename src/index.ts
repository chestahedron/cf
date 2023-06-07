import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

barba.init({
  transitions: [
    {
      name: 'animation',
      async leave(data) {
        await gsap.to(data.current.container, { opacity: 0, duration: 0.3 });
        //console.log(data);
      },
      async enter(data) {
        await gsap.to(data.next.container, { opacity: 1, duration: 0.3 });
        //console.log(data);
      },
    },
    {
      name: 'contact-animation',
      to: {
        namespace: ['contact'],
      },

      async enter(data) {
        console.log(data);
        data.next.container.classList.add('transition');
        data.next.container.classList.remove('transition');
      },
    },
  ],
});

// restart Webflow forms
barba.hooks.after(async () => {
  await restartWebflow();
});
