# team Blue - M7 & M12
# starting position-vertical 8th block

if __name__ == "__main__":
    import main

from pybricks.tools import run_task, wait

def test(robot):
    #run_task(robot.both_attachment_reset(distance=0, left_speed=30, right_speed=50, left_direction="left"))
    #robot.left_attachment_turn(-150)
    run_task(robot.both_attachment_turn(right_angle=150, left_angle=-150, right_speed=400, left_speed=600, distance=0, move_speed=450))

def r8(robot):
    robot.move(23)
    robot.turn(90)
    run_task(robot.both_attachment_reset(distance=57.5, move_speed=300, left_speed=40, right_speed=40))
    robot.left_attachment_turn(70)
    robot.turn(67.5)
    robot.right_attachment_turn(-325)
    robot.turn(12)
    robot.move(5)
    robot.move(-2)
    wait(300)
    run_task(robot.both_attachment_turn(right_angle=60, left_angle=200, right_speed=400, left_speed=600, distance=0, move_speed=450))
    