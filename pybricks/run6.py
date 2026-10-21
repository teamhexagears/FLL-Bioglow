# Team Blue - M12a + M12b
# 1 thick black line from the left
# remember to move both attachments up when before starting the code.

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r6(robot):
  run_task(robot.both_attachment_reset(distance=39, move_speed=450, left_power=-40, right_power=-50))
  #robot.move(44)
  robot.turn(angle=41, speed=500)
  robot.move(18, speed=100)
  #robot.turn(15)
  robot.left_attachment_turn(angle=170, speed=90)
  robot.right_attachment_turn(angle=80, speed=90)
  robot.turn(angle=50, speed=300)
  robot.turn(-15)
  #robot.left_attachment_turn(angle=90, speed=90)
  #robot.right_attachment_turn(-20)
  #robot.turn(65, speed=100)
  #robot.move(-13)
  run_task(robot.right_attachment_while_move(right_angle=-20, right_speed=500, distance=-17, move_speed=400))
  robot.turn(55)
  robot.right_attachment_turn(-5)
  #robot.right_attachment_turn(150)
  #robot.move(60)
  #robot.turn(147)
  #robot.left_attachment_turn(-85)
  #robot.move(34)
  #robot.left_attachment_turn(angle=50, speed=80)
  #robot.move(-50)
  robot.move(43)
  
