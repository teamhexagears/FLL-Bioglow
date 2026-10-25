# team Blue - M7 & M12c (support and myceiliem)
# starting position-vertical 9th block

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r7(robot):
    run_task(robot.curve_move_reset(speed=1000, radius=297, distance=75, left_power=-50, right_power=50, left_speed=1000))
    robot.left_attachment_turn(240)
    run_task(robot.curve_move(speed=1000, radius=-400, distance=-10))
    robot.move(8.5, 1000)
    run_task(robot.both_attachment_turn(right_angle=-150, left_angle=315, right_speed=500, left_speed=3000))
    robot.turn(-75, 800)
    robot.move(-70, 1000)
    robot.stop()