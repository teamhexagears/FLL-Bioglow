# FLL-Bioglow
Code for FLL BIoglow

| Function name | Parameters | Description |
| -------- | -------- | -------- |
| `robot.move` | `distance`, `speed=150` | `distance` is the distance to travel; `speed` controls driving speed |
| `robot.parallel_move` | `distance`, `speed=150` | *this is for multitasking* `distance` is the distance to travel; `speed` controls driving speed |
| `robot.turn` | `angle`, `speed=150` | `angle` is the turning angle in degrees; `speed` controls turning speed |
| `robot.move_till_stalled` | `speed=50` | *not very reliable* `speed` controls how fast the robot drives while looking for a stall |
| `robot.move_till_line` | `speed=50` | `speed` controls how fast the robot drives while searching for the line |
| `robot.curve_move` | `speed`, `straight_distance`, `turn_distance` | Controls the speed and distances used to calculate the curved movement |
| `robot.stop` | None | Stops the driving base |
| `robot.right_attachment_turn` | `angle`, `speed=300` | Rotates the right attachment by `angle` degrees at the specified speed |
| `robot.left_attachment_turn` | `angle`, `speed=300` | Rotates the left attachment by `angle` degrees at the specified speed |
| `robot.right_attachment_reset` | None | Resets the right attachment by running it until it stalls |
| `robot.left_attachment_reset` | None | Resets the left attachment by running it until it stalls |
| `both_attachment_turn` | angle, speed=100 | two motor attachment turn at the same time |
| `both_attachment_reset` | distance, speed=150 | reset both attachment at the same time while moving|
