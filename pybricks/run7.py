# Team Blue - M12a + M12b
# 1 and 1/3 black line from the left

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r7(robot):
  #run_task(robot.both_attachment_reset(distance=44, move_speed=450, left_speed=150, right_speed=150))
  #run_task(robot.left_attachment_reset(speed=50))
  robot.move(44)
  robot.turn(41)
  robot.move(17)
  robot.left_attachment_turn(angle=145, speed=90)
  robot.right_attachment_turn(-5)
  robot.turn(65, speed=100)
  robot.move(-20)
  robot.turn(55)
  robot.right_attachment_turn(150)
  robot.move(50)
  robot.turn(147)
  robot.left_attachment_turn(-85)
  robot.move(34)
  robot.left_attachment_turn(angle=50, speed=80)
  robot.move(-50)
  
