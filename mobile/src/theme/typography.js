// Typography constants for Campaign 365
// Serif: Georgia (iOS system font — used for all headings/titles)
// Sans: System default (used for body, labels, buttons)

export const FONTS = {
  serif:  'Georgia',
  sans:   undefined, // system default sans-serif
};

export const TYPE = {
  // App header "Campaign 365" — appears in every screen header
  appTitle: {
    fontFamily: 'Georgia',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // Main screen heading ("Welcome Back!", "Good afternoon, General!")
  heading: {
    fontFamily: 'Georgia',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.3,
  },

  // Secondary heading (screen titles like "Profile", "My Assignments")
  subheading: {
    fontFamily: 'Georgia',
    fontSize: 22,
    fontWeight: '700',
  },

  // Subtitle / tagline ("Sign in to start canvassing", "Ready to hit the streets?")
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  },

  // Button text ("Log In", "START CANVASSING NOW")
  button: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
  },

  // Input field text
  input: {
    fontSize: 16,
    fontWeight: '400',
  },

  // Section titles ("My Assigned Turfs", "Take Quick Poll")
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },

  // Navigation tab labels
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },

  // Small labels, badges ("Canvasser", "Version 1.0")
  label: {
    fontSize: 12,
    fontWeight: '400',
  },

  // Body text
  body: {
    fontSize: 14,
    fontWeight: '400',
  },
};
