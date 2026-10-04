# Team Green - M15

if __name__ == "__main__":
    import main
# team green        4 from the right
from pybricks.tools import run_task

def r4(robot):
    robot.move(3)
    robot.turn(60)
    run_task(robot.both_attachment_turn(right_angle=65, left_angle=0, right_speed=100, left_speed=0, distance=7.5, move_speed=350))
    robot.right_attachment_turn(-80, 500)
    robot.right_attachment_turn(180, 500)
    robot.right_attachment_turn(-80, 500)
    robot.move(-50)
    robot.turn(30)
    robot.move(-50)
    