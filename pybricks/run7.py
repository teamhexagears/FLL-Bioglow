# team Blue - M7 & M12c (support and white stuff)
# starting position-vertical 8th block

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r7(robot):
    run_task(robot.both_attachment_reset(distance=23, move_speed=450, left_power=-35, right_power=35))
    robot.turn(90)
    robot.move(55)
    robot.left_attachment_turn(40)
    robot.turn(68)
    robot.move(8)
    run_task(robot.both_attachment_turn(right_angle=-120, left_angle=200, right_speed=400, left_speed=600, distance=0, move_speed=450))
    robot.move(-11)
    robot.turn(90)
    robot.move(distance=95, speed=700)