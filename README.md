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

The plan starts with a gentle 4-week restart phase (3 workouts a week). After 4 weeks where you hit the goal, the app offers to move you up to the full plan.

## Backup

Everything is stored on the phone itself. On the **Week** tab, tap **Save a backup** and save the file to iCloud Drive or Files. **Restore a backup** brings it back, for example on a new phone.

If you remove the app from your home screen or clear Safari's website data, the data on the phone is deleted with it.

## Exercise data

Exercises, instructions and photos come from [Free Exercise DB](https://github.com/yuhonas/free-exercise-db), which is in the public domain. The photos are resized and packed into `lib/`.

## How it's built

Plain HTML, CSS and JavaScript with no build step, hosted on GitHub Pages.
