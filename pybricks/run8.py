# team Blue - M7 & M12
# starting position-vertical 8th block

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r8(robot):
    robot.move(23) 
    robot.turn(90)
    robot.move(55) 
    robot.turn(68) 
    robot.move(8)
    run_task(robot.both_attachment_turn(right_angle=-120, left_angle=200, right_speed=400, left_speed=600, distance=0, move_speed=450))
    robot.turn(-85)
    robot.move(-74)
    run_task(robot.both_attachment_reset(distance=123, speed=450, left_speed=150, right_speed=150))


