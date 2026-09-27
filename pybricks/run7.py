# Team Blue - M12a + M12b
# 1 and 1/3 black line from the left

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r7(robot):
  robot.move(44)
  robot.turn(41)
  robot.move(17)
  robot.left_attachment_turn(angle=145, speed=100)
  #robot.left_attachment_turn(150)
  robot.right_attachment_turn(-5)
  robot.turn(65, speed=100)
  robot.move(-20)