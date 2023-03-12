<h1>How the hack? Project March 3-17, 2023</h1>

- hackathon hosted by [askui.com](https://www.askui.com)
- Theme: Beyond the Browser.
- 2-week remote hackathon (It's actually 1 week because week 2 is judging results).

Note to the judges: Seema, Rahul, Roman, Sahil, Kiruthika, I personally thank you for reviewing my project, I hope this is fun for you to see, because I poured my soul into it! 😃 Even though the actual test file is less than 500 lines 🙈.

<h1>Contents</h1>

- [Instructions](#instructions)
- [Project Goal](#project-goal)
- [What I built](#what-i-built)
- [Assumptions about the user](#assumptions-about-the-user)
- [The Approach](#the-approach)
- [About me (at the time I did the hackathon)](#about-me-at-the-time-i-did-the-hackathon)
- [The challenges I faced](#the-challenges-i-faced)
- [Bugs I noticed on the askui website](#bugs-i-noticed-on-the-askui-website)
- [List of things I learned](#list-of-things-i-learned)
- [Things I didn't have time to do or investigate (boo)](#things-i-didnt-have-time-to-do-or-investigate-boo)
- [Have feedback?](#have-feedback)
- [Resources](#resources)

# Instructions

- `npm install` after you clone the project.
- `jest.setup.ts` - configure a valid askui token / workspace id.
- `askui-login-firefox.test.ts` configure valid user credentials (I've applied the [`isSecret` option](https://docs.askui.com/docs/api/Commands/type) to it).
- Firefox
  - 'Zoom text only' option only should be disabled.
  - Zoom level should be at default.
  - Firefox may need to be maximised if the tests don't run properly (not sure).
- NVDA
  - Manually run NVDA and close the welcome dialog box.
  - Turn on Speech Viewer by going to the NVDA tools. I like to make it kinda small and move it to the bottom right. That way, it's out the way of askui.
  - Settings > Turn off mouse tracking, turn on speech for command buttons.
- `npm test` once you're done the config above.

# Project Goal

Harness the power of askui to simulate how an accessibility user would use a digital product.

# What I built

An automated check for the journey of a user logging in to the askui website. The user primarily uses the keyboard to navigate the browser.

# Assumptions about the user

1. Already registered on the askui website.
2. Read at 200% font size.
3. Only uses the keyboard (mostly, I had one instance where I HAD to use the mouse to get around the problem for cookie notice)
4. Using Firefox on Windows.
5. They somehow know exactly how many key presses to get to where they want to go (I'm jk, I'm referring to deterministic tests).

Note: I was advised 200% is a recommended max percentage to test for. On Firefox, you mustn't forget to set zoom text only as a realistic test.

# The Approach

I simply played around with askui and hacked it out. The other thing I had to do was learn to use the keyboard to navigate and learn a bit about NVDA.

# About me (at the time I did the hackathon)

1. Basic knowledge in accessibility from a recent foundational course.
2. Basic set of coding skills and automation (I have only recently started to learn).
3. I'm joining this to see improve my skills in automation and experience a hackathon.
4. There was an option to join as a team, but I couldn't find anyone so I did it solo.

# The challenges I faced

How the hack is my first hackathon, I was pretty much stabbing in the dark. There is not much planning involved, contrary to what a judge recommended in the opening ceremony.

Time was against me since I had a full time job:

- I could not spend time attending workshops or any of the ceremonies.
- I skipped recordings, because that would take away precious dev time.
- I spent an average of 2 hours each evening throughout the hackathon (I lie, I often stayed up to 1AM as well)

Development was painfully slow with askui. I had to code one change, wait for the test to run and see if it worked. Rinse and repeat. askui's AI still takes time to process what is on the screen. The OCR is also not perfect which contributes to flakiness of my asserts. I decided to just remove asserts that are not reliable.

Another thing I noticed is `pressKey` ain't always pressing (sad). I originally thought it could be to do with UIController, VSCode, or NVDA. But restarting them all, sometimes it still doesn't work. I honestly don't know!

# Bugs I noticed on the askui website

1. There are no focus boxes on some elements on the home page.
2. There are many colour contrast issues on the home page.
3. 'learn more' button labels by themselves are not descriptive enough for screen reader users. There are 6 of those, so it would be difficult for them to understand what each one relate to.
4. There is no skip links like 'skip to main content'.
5. Zoom level is not consistent between the homepage and the login section. This is because of the different domains. For example, setting `askui.com` to 200% does affect `askui-portal.eu.auth0.com` (it's back to default 100%). This could be expected (relates to What I learned, point 8).
6. When the homepage loads with the cookie notice, the focus is behind the cookie notice. It should be trapped within the cookie notice, until the user dismisses it. This can be a confusing experience for a screen reader user.
7. NVDA reads askui as 'Ask wee' or 'Ask oo-ee'.

# List of things I learned

1. I used the AAA pattern.
2. Sometimes I forget about `exec()` and wonder why it's not working.
3. Added `test` to the `package.json` npm scripts.
4. Added `annotate()` to `afterEach()` to try and save myself time.
5. It's good to assert that something does NOT exist after I dismiss it (e.g. a modal).
6. I could use a mixture of `it.only` and `xit` to help me develop a bit quicker.
7. NVDA has an option to speak command keys, that helped me in debugging.
8. I imported askui-examples, so I could always do a global search to learn by example.
9. In Firefox, setting the zoom via 'View' -> 'Zoom' menu configures it by domain. Changing the setting in Firefox settings does it for all websites. There is a difference!
10. Tuesday, I carried on through the night until 4:30AM. Never do that again, bad for health. Work colleagues must wonder why I'm tired lately.
11. When multiple similar elements exist, the test does not execute as intended e.g. multiple occurrences of some text and `moveMouseTo` goes to the wrong place.
12. I'm screwed if elements go out of view. If one domino doesn't fall, my whole test suite will fail.
13. The default NVDA key is 'Insert' but this parameter was not available under pressTwoKeys. Neither is 'Caps lock', the alternative NVDA key. I really wanted to show the judges how it would look if I could automate browsing elements list (NVDA button + F7).
    1. I found a possible workaround, control + f to jump to a link.
14. Jest continues running test even if the first one fails, I learned to work around this by doing some googling (see [GitHub page](https://github.com/facebook/jest/issues/6527#issuecomment-1463950981))

# Things I didn't have time to do or investigate (boo)

1. There's no way to assert that the font size is the expected zoom size (with my current level of knowledge).
2. Implement NVDA (screen reader) with speech viewer open, then export the whole end-to-end user journey. That gives developers and the team insight on how the elements were actually read out.
3. Implement OBS (or a screen recorder) to automate video recording the session.
4. Implement an on-screen keyboard button to displays key presses that the user made. This is useful for the screen recording.
5. Learn how to split my tests, should they all be under one file really?
6. Should each test be hermetic? It seems that it's impossible, given it's an end-to-end user journey.
7. I would ideally want to assert the exact UI that I triggered, but I lack the knowledge (image diff?).
8. There are so many `await` repeating, is there a way to just get rid of them all for simplicity?
9. Automating the registration flow to complete the original problem statement: 'Create an end-to-end test for our user portal'.

# Have feedback?

Feel free to contact me or raise an issue, maybe you have plenty of suggestions for me to improve.

# Resources

- [Hackathon terms and conditions](https://askui-public.s3.eu-central-1.amazonaws.com/assets/hackathon/HACKATHON-TERMS_AND_CONDITIONS.pdf)
- [Link to the handbook](https://docs.google.com/document/d/1GW3qdDtjx6GHyKXI-fB5_xHF5wr1ERa0wOeLncBNPB4/edit#heading=h.gpf5ucx29pjw)
