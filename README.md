# FLL-Bioglow
Code for FLL BIoglow

| Function name | Parameters | Description |
| -------- | -------- | -------- |
| `robot.move` | `distance`, `speed=450` | `distance` is the distance to travel; `speed` controls driving speed |
| `robot.parallel_move` | `distance`, `speed=450` | *this is for multitasking* `distance` is the distance to travel; `speed` controls driving speed |
| `robot.turn` | `angle`, `speed=150` | `angle` is the turning angle in degrees; `speed` controls turning speed |
| `robot.move_till_stalled` | `speed=50` | *not very reliable* `speed` controls how fast the robot drives while looking for a stall |
| `robot.move_till_line` | `speed=50` | `speed` controls how fast the robot drives while searching for the line |
| `robot.curve_move` | `speed`, `straight_distance`, `turn_distance` | Controls the speed and distances used to calculate the curved movement |
| `robot.stop` | None | Stops the driving base |
| `robot.right_attachment_turn` | `angle`, `speed=300` | Rotates the right attachment by `angle` degrees at the specified speed |
| `robot.left_attachment_turn` | `angle`, `speed=300` | Rotates the left attachment by `angle` degrees at the specified speed |
| `robot.right_attachment_reset` | None | Resets the right attachment by running it until it stalls |
| `robot.left_attachment_reset` | None | Resets the left attachment by running it until it stalls |
| `both_attachment_turn` |right_angle=0, left_angle=0, right_speed=100, left_speed=100, distance=0, move_speed=450|*if you want to turn the motor the other way use a negative number* two motor attachment turn at the same time, different angle, while driving the robot |
| `both_attachment_reset` | distance, speed=450, left_speed=150, right_speed=150 |reset both attatchments while moving|

## Features to add
