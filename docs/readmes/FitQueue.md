# FitQueue — Workout Exercise Queue

A Java Swing desktop app for planning a workout: add exercises with a duration, then start the workout and go through
them one at a time, in order (first in, first out).

## Screenshots

TODO(rafael): add screenshots of the home, add-exercise and start-workout windows.

## Features

- Add exercises (name and duration) to a queue
- Start a workout and step through the exercises in order, with a "Done" button
- Messages for the last exercise and when the queue is empty
- Queue built on `java.util.LinkedList` (`src/ExerciseQueue.java`)

## Tech stack

Java · Swing · NetBeans (Ant build)

## Run locally

Open the folder in NetBeans and run the project, or build with Ant:

```bash
ant jar
java -jar dist/FitQueue.jar
```

Main class: `HomePageFrame`.

## My role

TODO(rafael): solo or team, and the course (Data Structures?).
