export const MeetupDescription = {
  template: `<p class="meetup-description">{{meetup.description}}</p>`,

  name: "MeetupDescription",

  props: {
    meetup: {
      type: Object,
      required: true,
    }
  }

};
