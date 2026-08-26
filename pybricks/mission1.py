from pybricks.tools import multitask, run_task, wait

if __name__ == "__main__":
    import main

def m1(robot):
    print("Mission 1 starting...")

    robot.right_gear_ratio = robot.set_gear_ratio([12, 24])
    robot.left_gear_ratio = robot.set_gear_ratio([12, 24])

    run_task(robot.both_attachments_turn(-500, speed=300))
    run_task(robot.attachment_turn_and_move(-300, -100, turn_speed=150, move_speed=300))
    
    print("Mission 1 complete!")