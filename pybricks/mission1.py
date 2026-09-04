# team red

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m1(robot):
    run_task(robot.both_attachment_reset(270))
    run_task(robot.both_attachment_turn(-350, -350))
    #robot.move(-35)