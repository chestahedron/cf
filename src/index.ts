import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

barba.init({
  transitions: [
    {
      name: 'animate',
      async leave(data) {
        await gsap.to(data.current.container, { opacity: 0, duration: 0.3 });
        //console.log(data);
      },
      async enter(data) {
        await gsap.to(data.next.container, { opacity: 1, duration: 0.3 });
        //console.log(data);
      },
    },
  ],
});

// restart Webflow forms
barba.hooks.after(async () => {
  await restartWebflow();
});
