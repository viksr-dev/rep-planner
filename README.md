# Rep Planner

A phone app for planning your training week, logging workouts and tracking progress.

**Open it:** https://viksr-dev.github.io/rep-planner/

## Installing on an iPhone

1. Open the link above in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**, then **Add**.
3. It now opens from its own icon, full screen, and works without internet.

## Using it

- **Today:** shows today's workout. Tap **I did it** to log it in one tap, or tick off each set as you go.
- **Week:** choose a workout or rest for each day and set a weekly goal. Earlier days this week have a **Did it** button if you forgot to log.
- **Workouts:** set the sets, reps and weight for each exercise, add exercises from the library, or make new workouts.
- **Library:** search 873 exercises by name, muscle, type and equipment. Each has start and end photos, step-by-step instructions and a link to video demonstrations.
- **Progress:** weekly volume, best sets, and a chart for each exercise.
- **Body:** log body weight and measurements, with a chart for each.

The plan is 4 days a week: Push, Pull, Core & abs, and Cardio & stretch, using simple, supported moves to start with. On January 1, 2027 a bodyweight Full body day is added as a 5th day.

- **Weight checks** come every 4 weeks. If you hit your weekly goal in at least 3 of those weeks, lifts where you finished every rep (and that didn't feel hard) go up a small step.
- **Harder moves** (barbell rows, Romanian deadlifts, skull crushers and so on) are offered from March 1, 2027, once you have 12 weeks where you hit your goal. You can change that date on the Week tab, and switch back if they're too much.

## Backup

Everything is stored on the phone itself. On the **Week** tab, tap **Save a backup** and save the file to iCloud Drive or Files. **Restore a backup** brings it back, for example on a new phone.

If you remove the app from your home screen or clear Safari's website data, the data on the phone is deleted with it.

## Exercise data

Exercises, instructions and photos come from [Free Exercise DB](https://github.com/yuhonas/free-exercise-db), which is in the public domain. The photos are resized and packed into `lib/`.

## How it's built

Plain HTML, CSS and JavaScript with no build step, hosted on GitHub Pages.
