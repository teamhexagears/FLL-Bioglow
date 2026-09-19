if __name__ == "__main__":
    import main
# team green
from pybricks.tools import run_task

def r3(robot):
    robot.move(5)
    robot.turn(60)
    robot.right_attachment_turn(30)
    run_task(robot.both_attachment_turn(-50, 0, -45, 0, 800))
    robot.right_attachment_turn(-70, 500)
    robot.right_attachment_turn(140, 500)
    robot.right_attachment_turn(-50, 500)
    robot.move(-50)
    robot.turn(30)
    robot.move(-50)