# Team Green - M15

if __name__ == "__main__":
    import main
# team green        4 from the right
from pybricks.tools import run_task

def r4(robot):
    robot.move(5)
    robot.turn(60)
  #  robot.right_attachment_turn(30)
    run_task(robot.both_attachment_turn(right_angle=-50, left_angle=0, right_speed=100, left_speed=100, distance=50, move_speed=350))
    robot.right_attachment_turn(-70, 500)
    robot.right_attachment_turn(140, 500)
    robot.right_attachment_turn(-50, 500)
    robot.move(-50)
    robot.turn(30)
    robot.move(-50)
    