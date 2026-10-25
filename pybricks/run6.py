# Team Blue - M12a + M12b
# 1 thick black line from the left
# remember to move both attachments up when before starting the code.

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r6(robot):
  # Reset and move to tree
  run_task(robot.both_attachment_reset(distance=39, move_speed=1000, left_power=-40, right_power=-50))
  
  # retrive seed
  robot.turn(angle=41, speed=800)
  robot.move(18, speed=100)
  robot.left_attachment_turn(angle=170, speed=90)

  # pull ring
  robot.right_attachment_turn(angle=80, speed=90)
  robot.turn(angle=50, speed=800)
  #robot.turn(-15,speed=800)
  run_task(robot.right_attachment_while_move(right_angle=-20, right_speed=500, distance=-17, move_speed=400))

  # go home
  robot.turn(55,speed=800)
  robot.right_attachment_turn(-5)
  robot.move(43,speed=1000)
  robot.stop()