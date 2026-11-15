/** Every joke in one place, so tuning the spice level is a one-file job. */
export const gags = {
  preloader: {
    loading: "Loading talent… this may take a while.",
    stall: "Hmm. Recalculating ego…",
    done: "Fine. We're faking it.",
    skip: "Skip (I respect that)",
  },
  hero: {
    tagline: "Developer. Allegedly.",
    hint: "Scroll to explore. Or don't. I'm a website, not a cop.",
    mobileHint: "Pinch to zoom? We already did that for you. You're welcome.",
    taglines: [
      "Developer. Allegedly.",
      "Full-stack. Because choosing one stack wasn't enough.",
      "Works on my machine™",
      "Currently debugging my life.",
      "99% coding. 1% wondering why it worked yesterday.",
    ],
  },
  theme: {
    toLight: "Light mode. Bold choice.",
    toDark: "Welcome back to the cave.",
  },
  boring: {
    button: "Boring Mode",
    enter: "Fine. Here's the spreadsheet version.",
    exit: "Bring back the fun",
    banner: "You are in Boring Mode. All facts, zero jokes. Okay, maybe one.",
  },
  cursor: {
    photo: "Yes, that's really him.",
    resume: "The PDF is boring. I warned you.",
    boring: "Coward. (Respectfully.)",
    portal: "Go on. Dive in.",
    email: "He'll reply. Eventually.",
  },
  backScroll: [
    "Oh, now you want to leave?",
    "Reverse gear? Bold.",
    "Forgot something back there?",
  ],
  idle: {
    yawn: "*yawns in JavaScript*",
    asleep: "zzz… npm install sleep… zzz",
    wake: "You still there?",
  },
  tab: { first: "Come back 😢", second: "Fine. Whatever." },
  console: "Inspecting my code? Hire me, it'll be cheaper.",
  loops: [
    "",
    "Told you it was infinite. Go outside.",
    "Loop 2. You're committed. I like that.",
    "Loop 3. Seriously, are you okay?",
    "Loop 4. At this point you should just hire me.",
    "Loop 5+. I'm calling your mom.",
  ],
  contact: {
    headline: "Congratulations. You scrolled further than most people read terms and conditions.",
    send: "Send (I'll reply within 3–5 business years)",
    sending: "Bribing the SMTP server…",
    sent: "Delivered. Plot twist: I actually reply fast.",
    error: "The mailbox ate it. Try again, or email directly.",
  },
} as const;
