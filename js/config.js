/*
 * SITE CONFIG
 * ------------------------------------------------------------------
 * Everything a gym owner would want changed lives here: name, copy,
 * contact details, prices, trainers, schedule. Edit this one file to
 * rebrand the whole site. Colours and fonts live as CSS variables at
 * the top of css/styles.css (the accent can also be overridden below).
 */
window.SITE_CONFIG = {
  brand: {
    name: "Forge",
    suffix: "Athletic Club",
    tagline: "Built stronger, together.",
    // Optional: override the accent colour from styles.css (any CSS colour). Leave "" to keep the default.
    accent: "",
  },

  hero: {
    eyebrow: "Strength · Conditioning · Community",
    title: "Train like you<br>mean it.",
    subtitle:
      "Coach-led classes, serious equipment and a crew that keeps you showing up. Your first week is on us.",
    primaryCta: "Book a free trial",
    secondaryCta: "View classes",
    // Hero photo. For the fastest first paint, also paste it into the <img id="hero-img">
    // in index.html (the site still works if you only change it here).
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=70",
    stats: [
      { value: "2,400+", label: "Active members" },
      { value: "60+", label: "Classes a week" },
      { value: "24/7", label: "Member access" },
    ],
  },

  programs: [
    {
      icon: "dumbbell",
      title: "Strength & Power",
      imageAlt: "Members training in a Strength & Power class",
      text: "Barbell-focused programming that builds real, measurable strength week over week.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=70",
    },
    {
      icon: "flame",
      title: "HIIT Conditioning",
      imageAlt: "Members working hard in a HIIT Conditioning class",
      text: "45 minutes of intervals that torch calories and push your engine further.",
      image:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=70",
    },
    {
      icon: "glove",
      title: "Boxing",
      imageAlt: "Member training in a Boxing class",
      text: "Pad work, footwork and bag rounds. Learn real technique while getting fit.",
      image:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=70",
    },
    {
      icon: "lotus",
      title: "Mobility & Yoga",
      imageAlt: "Member stretching in a Mobility & Yoga class",
      text: "Recover better, move freely and keep your body ready for everything else.",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=70",
    },
  ],

  pricing: {
    currency: "$",
    annualNote: "Save 20% with annual billing",
    plans: [
      {
        name: "Essential",
        monthly: 39,
        annual: 31,
        description: "Everything you need to train on your own terms.",
        features: ["24/7 gym floor access", "Locker rooms & showers", "Free fitness assessment", "Member app"],
        cta: "Start Essential",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=70",
        imageAlt: "Member training with dumbbells",
      },
      {
        name: "Performance",
        monthly: 69,
        annual: 55,
        featured: true,
        badge: "Most popular",
        description: "Unlimited classes plus coaching to keep you progressing.",
        features: [
          "Everything in Essential",
          "Unlimited group classes",
          "Monthly progress check-in",
          "2 guest passes / month",
        ],
        cta: "Start Performance",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=70",
        imageAlt: "Member lifting in the strength area",
      },
      {
        name: "Elite",
        monthly: 129,
        annual: 103,
        description: "Personal coaching and recovery for maximum results.",
        features: [
          "Everything in Performance",
          "4 personal training sessions",
          "Custom nutrition plan",
          "Recovery suite & sauna",
        ],
        cta: "Start Elite",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=70",
        imageAlt: "Rows of equipment on the gym floor",
      },
    ],
  },

  trainers: [
    {
      name: "Marcus Reed",
      role: "Head Strength Coach",
      bio: "Former competitive powerlifter. 12 years coaching athletes and beginners alike.",
      image:
        "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=70",
      instagram: "#",
    },
    {
      name: "Aisha Khan",
      role: "HIIT & Conditioning",
      bio: "Turns tough sessions into the best part of your day. NASM certified.",
      image:
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=70",
      instagram: "#",
    },
    {
      name: "Diego Santos",
      role: "Boxing Coach",
      bio: "Amateur champion turned coach. Technique first, then intensity.",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=70",
      instagram: "#",
    },
    {
      name: "Lena Park",
      role: "Mobility & Yoga",
      bio: "Helps lifters move better and recover faster. RYT-500.",
      image:
        "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=700&q=70",
      instagram: "#",
    },
  ],

  testimonials: [
    {
      quote:
        "I've joined a lot of gyms. This is the first one I've stuck with for more than three months. The coaches actually know your name.",
      name: "Jordan M.",
      detail: "Member since 2022",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=160&h=160&q=70",
    },
    {
      quote:
        "Down 14 kg and deadlifting double what I could when I started. The Performance plan paid for itself.",
      name: "Priya S.",
      detail: "Performance member",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=160&h=160&q=70",
    },
    {
      quote:
        "The boxing classes are the highlight of my week. Great energy, clean facility, zero ego.",
      name: "Chris T.",
      detail: "Boxing regular",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2e?auto=format&fit=crop&crop=faces&w=160&h=160&q=70",
    },
  ],

  // Days: Mon, Tue, Wed, Thu, Fri, Sat, Sun
  schedule: {
    Mon: [
      { time: "06:00", name: "HIIT Conditioning", coach: "Aisha Khan", duration: 45 },
      { time: "12:15", name: "Strength & Power", coach: "Marcus Reed", duration: 60 },
      { time: "18:00", name: "Boxing", coach: "Diego Santos", duration: 60 },
      { time: "19:30", name: "Mobility & Yoga", coach: "Lena Park", duration: 45 },
    ],
    Tue: [
      { time: "06:00", name: "Strength & Power", coach: "Marcus Reed", duration: 60 },
      { time: "07:15", name: "Mobility & Yoga", coach: "Lena Park", duration: 45 },
      { time: "17:30", name: "HIIT Conditioning", coach: "Aisha Khan", duration: 45 },
      { time: "18:45", name: "Boxing", coach: "Diego Santos", duration: 60 },
    ],
    Wed: [
      { time: "06:00", name: "HIIT Conditioning", coach: "Aisha Khan", duration: 45 },
      { time: "12:15", name: "Boxing", coach: "Diego Santos", duration: 45 },
      { time: "18:00", name: "Strength & Power", coach: "Marcus Reed", duration: 60 },
      { time: "19:30", name: "Mobility & Yoga", coach: "Lena Park", duration: 45 },
    ],
    Thu: [
      { time: "06:00", name: "Strength & Power", coach: "Marcus Reed", duration: 60 },
      { time: "12:15", name: "HIIT Conditioning", coach: "Aisha Khan", duration: 45 },
      { time: "18:00", name: "Boxing", coach: "Diego Santos", duration: 60 },
    ],
    Fri: [
      { time: "06:00", name: "HIIT Conditioning", coach: "Aisha Khan", duration: 45 },
      { time: "07:15", name: "Mobility & Yoga", coach: "Lena Park", duration: 45 },
      { time: "17:30", name: "Strength & Power", coach: "Marcus Reed", duration: 60 },
    ],
    Sat: [
      { time: "08:00", name: "Team WOD", coach: "Aisha Khan", duration: 60 },
      { time: "09:30", name: "Boxing", coach: "Diego Santos", duration: 60 },
      { time: "11:00", name: "Mobility & Yoga", coach: "Lena Park", duration: 60 },
    ],
    Sun: [
      { time: "09:00", name: "Open Gym Strength", coach: "Marcus Reed", duration: 90 },
      { time: "10:30", name: "Recovery Yoga", coach: "Lena Park", duration: 45 },
    ],
  },

  // Background photo behind the free-trial form.
  trial: {
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1600&q=70",
  },

  contact: {
    address: "128 Foundry Lane, Brooklyn, NY 11201",
    phone: "+1 (555) 014-2290",
    email: "hello@forgeathletic.club",
    // Used for the embedded Google Map (no API key needed).
    mapQuery: "Brooklyn Bridge Park, Brooklyn, NY",
    // Photo of the gym shown above the map.
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "Inside the Forge Athletic Club training floor",
    hours: [
      { days: "Monday – Friday", time: "5:00 AM – 11:00 PM" },
      { days: "Saturday", time: "7:00 AM – 9:00 PM" },
      { days: "Sunday", time: "8:00 AM – 8:00 PM" },
      { days: "Members", time: "24/7 key-fob access" },
    ],
    social: { instagram: "#", facebook: "#", tiktok: "#" },
  },
};
