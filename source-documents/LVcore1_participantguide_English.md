# LabVIEW
TM
Core 1
Participant Guide
Course Software Version LabVIEW 2020
2020 Edition
Part Number 327415B-01
LabVIEW Core 1
Copyright
© 2020 National Instruments Corporation. All rights reserved.
Under the copyright laws, this publication may not be reproduced or transmitted in any form,
electronic or mechanical, including photocopying, recording, storing in an information retrieval
system, or translating, in whole or in part, without the prior written consent of National
Instruments Corporation.
NI respects the intellectual property of others, and we ask our users to do the same. NI software
is protected by copyright and other intellectual property laws. Where NI software may be used
to reproduce software or other materials belonging to others, you may use NI software only to
reproduce materials that you may reproduce in accordance with the terms of any applicable
license or other legal restriction.
End-User License Agreements and Third-Party Legal Notices
```
You can find end-user license agreements (EULAs) and third-party legal notices in the following
```
```
locations:
```
• Notices are located in the <National Instruments>\_Legal Information and
<National Instruments> directories.
• EULAs are located in the <National Instruments>\Shared\MDF\Legal\License
directory.
• Review <National Instruments>\_Legal Information.txt for more information on
including legal information in installers built with NI products.
Copyright 2020 National Instruments
Trademarks
Refer to theNI Trademarks and Logo Guidelines at ni.com/trademarks for more information
on NI trademarks.
ARM, Keil, and μVision are trademarks or registered of ARM Ltd or its subsidiaries.
LEGO, the LEGO logo, WEDO, and MINDSTORMS are trademarks of the LEGO Group.
TETRIX by Pitsco is a trademark of Pitsco, Inc.
FIELDBUS FOUNDATION™ and FOUNDATION™ are trademarks of the Fieldbus Foundation.
EtherCAT® is a registered trademark of and licensed by Beckhoff Automation GmbH.
CANopen® is a registered Community Trademark of CAN in Automation e.V.
DeviceNet™ and EtherNet/IP™ are trademarks of ODVA.
Go!, SensorDAQ, and Vernier are registered trademarks of Vernier Software & Technology.
Vernier Software & Technology and vernier.com are trademarks or trade dress.
Xilinx is the registered trademark of Xilinx, Inc.
Taptite and Trilobular are registered trademarks of Research Engineering & Manufacturing Inc.
FireWire® is the registered trademark of Apple Inc.
Linux® is the registered trademark of Linus Torvalds in the U.S. and other countries.
Handle Graphics®, MATLAB®, Real-Time Workshop®, Simulink®, Stateflow®, and xPC
TargetBox® are registered trademarks, and TargetBox™ and Target Language Compiler™ are
trademarks of The MathWorks, Inc.
Tektronix®, Tek, and Tektronix, Enabling Technology are registered trademarks of Tektronix,
Inc.
The Bluetooth® word mark is a registered trademark owned by the Bluetooth SIG, Inc.
The ExpressCard™ word mark and logos are owned by PCMCIA and any use of such marks by
NI is under license.
The mark LabWindows is used under a license from Microsoft Corporation. Windows is a
registered trademark of Microsoft Corporation in the United States and other countries.
Other product and company names mentioned herein are trademarks or trade names of their
respective companies.
Members of the NI Alliance Partner Program are business entities independent from NI and have
no agency, partnership, or joint-venture relationship with NI.
Patents
For patents covering NI products/technology, refer to the appropriate location: Help»Patents in
your software, the patents.txt file on your media, or theNI Patent Notice at ni.com/
patents.
Support
Worldwide Technical Support and Product Information
ni.com
Worldwide Offices
Visit ni.com/niglobal to access the branch office websites, which provide up-to-date
contact information, support phone numbers, email addresses, and current events.
NI Corporate Headquarters
11500 North Mopac Expressway Austin, Texas 78759-3504 USA Tel: 512 683 0100
For further support information, refer to the Additional Information and Resources appendix.
To comment on NI documentation, refer to the NI website at ni.com/info and enter the Info
Code feedback.
Copyright 2020 National Instruments
Table of Contents
© National Instruments Corporation | iii
Student Guide
A. NI Certification ......................................................................... viii
B. Course Description.................................................................... viii
C. What You Need to Get Started ................................................... ix
D. Installing the Course Software.................................................... ix
E. Course Goals ........................................................................... ix
Lesson 1
Introduction to LabVIEW
A. What is LabVIEW? .................................................................... 1-3
B. Common Types of LabVIEW Applications .................................... 1-6
Lesson 2
```
First Measurement (NI DAQ Device)
```
A. Overview of Hardware .............................................................. 2-3
B. Connect Your Hardware ............................................................ 2-7
Exercise 2-1 Simulating NI Hardware............................................. 2-11
C. Validate Data (NI DAQ) ............................................................. 2-15
```
Exercise 2-2 Validating I/O (NI DAQ Device)................................... 2-17
```
D. Troubleshoot Unexpected I/O Results .......................................... 2-20
Lesson 3
```
First Measurement (Non-NI Instrument)
```
A. Overview of Hardware .............................................................. 3-3
B. Connect Your Hardware ............................................................ 3-5
```
Exercise 3-1 Connecting Hardware (Non-NI Instrument) ................... 3-6
```
C. Validate I/O (Non-NI Instrument) ................................................. 3-10
D. Troubleshoot Unexpected I/O Results .......................................... 3-12
Lesson 4
Exploring an Existing Application
A. Explore a LabVIEW Project ......................................................... 4-3
B. Parts of a VI ............................................................................ 4-6
Exercise 4-1 Exploring an Existing Project and a VI ......................... 4-16
C. Dataflow ................................................................................. 4-21
D. Example Code .......................................................................... 4-26
```
Exercise 4-2 Exploring Hardware Example Programs (Optional) ......... 4-27Copyright 2020 National Instruments
```
Table of Contents
iv | ni.com
Lesson 5
Creating Your First Application
A. Creating a New Project and a VI..................................................5-3
Exercise 5-1 Createing a Simple Project and a VI .............................5-5
B. Explore LabVIEW Data Types ......................................................5-11
C. Building an Acquire-Analyze-Visualize VI (NI DAQ).........................5-17
Exercise 5-2 Createing an Acquire-Analyze-Visualize VI ....................5-19
```
Exercise 5-3 DAQmx Task vs Full DAQmx API (Optional) .................5-28
```
D. Building an Acquire-Analyze-Visualize VI (Non-NI Instrument)..........5-36
Lesson 6
Debugging and Troubleshooting
A. Correct Broken VIs ....................................................................6-3
B. Debugging Techniques ...............................................................6-5
Exercise 6-1 Debugging................................................................6-8
C. Manage and Display Errors .........................................................6-14
Lesson 7
Executing Code Repeatedly Using Loops
A. While Loops..............................................................................7-3
Exercise 7-1 Introduction to While Loops........................................7-5
B. For Loops .................................................................................7-12
C. Timing a Loop ...........................................................................7-18
```
Exercise 7-2 Using Timing Functions and VIs in a Loop (Optional)......7-19
```
D. Using Loops with Hardware Application Programming Interfaces .....7-24
Exercise 7-3 Continuously Acquiring Data using DAQmx API Timing ..7-26
E. Data Feedback in Loops .............................................................7-31
Exercise 7-4 Using Shift Registers .................................................7-35
```
Exercise 7-5 (Self-Study) Using Stacked Shift Registers ...................7-38
```
Lesson 8
Working with Groups of Data
A. Groups of Data in LabVIEW ........................................................8-3
Exercise 8-1 Creating and Viewing an Array ...................................8-7
Exercise 8-2 Examining the Waveform Data Type ............................8-14
B. Working with Single-Channel Acquisition Data ..............................8-18
Exercise 8-3 Using Analysis Functions and VIs to Analyze Data ........8-22
C. Working withN-Channel Acquisition Data ....................................8-25
Exercise 8-4 VisualizingN-Channel Data.........................................8-26
Exercise 8-5 Extracting a Subset of anN-Channel Data Array
```
(Optional) ..............................................................................8-42
```
Exercise 8-6 Exploring Auto-Indexing Tunnels .................................8-52
Exercise 8-7 Processing Data For Each Channel in anN-Channel
Data Array ..............................................................................8-56
D. Additional Array Examples ..........................................................8-63
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation| v
Lesson 9
Executing Code Based on a Condition
A. Conditional Logic Introduction .................................................... 9-3
B. Creating and Configuring Case Structures .................................... 9-4
C. Common Examples ................................................................... 9-10
Exercise 9-1 Executing Code Based on a Condition ......................... 9-12
Exercise 9-2 Executing Code Conditionally Based on a User
Setting/Parameter/Configuration .................................................... 9-16
Lesson 10
Writing and Reading Data to File
A. Write Data to Text File .............................................................. 10-3
Exercise 10-1 Using High-Level I/O VIs/Functions ............................. 10-5
Exercise 10-2 Using Low-Level File I/O VIs/Functions to Stream Data
to a Text File ............................................................................. 10-16
B. Write Multi-Channel Data to Text File ......................................... 10-19
Exercise 10-3 StreamingN-Channel Acquisition Data to a Text File.... 10-21
C. Create File and Folder Paths ...................................................... 10-27
Exercise 10-4 Programmatically Creating Filenames Based on a
Current Timestamp ..................................................................... 10-29
D. Analyze Data in Text File .......................................................... 10-32
Exercise 10-5 Reading and Analyzing Data From a File in LabVIEW .... 10-33
E. Compare File Formats............................................................... 10-36
Lesson 11
Reusing Code
A. Understanding Modularity .......................................................... 11-3
B. Create an Icon.......................................................................... 11-5
C. Configuring the Connector Pane ................................................. 11-7
D. Document a SubVI....................................................................11-10
E. Call SubVIs ............................................................................. 11-12
Exercise 11-1 Creating and Using a SubVI ...................................... 11-14
Lesson 12
Grouping Data of Mixed Data Types
A. When to Use Clusters? .............................................................. 12-3
B. Create a Cluster ....................................................................... 12-6
C. Read and Write Clusters ............................................................ 12-7
Exercise 12-1 Grouping Related Data Using a Cluster ........................ 12-9
D. Error Clusters .......................................................................... 12-15
E. Using Clusters with Charts and Graphs....................................... 12-15
Lesson 13
Propagate Data Type Changes Using Type Definitions
A. When to Use Type Definitions?................................................... 13-3
B. Create and Use Type Definitions ................................................. 13-4
Exercise 13-1 Using a Type Definition ............................................. 13-6
Copyright 2020 National Instruments
Table of Contents
vi | ni.com
Lesson 14
Implementing a Sequencer
A. Explore Sequential Programming..................................................14-3
B. Explore State Programming.........................................................14-4
C. Build State Machines .................................................................14-6
Exercise 14-1 Creating a State Machine ...........................................14-7
Appendix A
Advanced File I/O
File Formats ...................................................................................A-3
Access TDMS Files in LabVIEW and Excel..........................................A-3
Write and Read Binary Files..............................................................A-5
Appendix B
Additional Information and Resources
NI Services ....................................................................................B-3
Services and Resources ...................................................................B-3
Other NI Training Courses ................................................................B-4
NI Certification ...............................................................................B-4
Copyright 2020 National Instruments
Student Guide
In this student guide, you will learn about the LabVIEW
Learning Path, the course description, and the items you
need to get started in the LabVIEW Core 1 course.
Topics
- NI Certification
- Course Description
- What You Need to Get Started
- Installing the Course Software
- Course Goals
Copyright 2020 National Instruments
Student Guide
viii | ni.com
A. NI Certification
TheLabVIEW Core 1 course is part of a series of courses designed to build your proficiency with
LabVIEW and help you prepare for the NI Certified LabVIEW Associate Developer exam. The
following illustration shows the courses that are part of the LabVIEW training series. Refer to
ni.com/training for more information about NI Certification.
This course is also part of the NI Badge program. The NI Badge program helps you find
learning resources and gain skills related to your projects. Track your knowledge
growth with milestone badge assessments and professional certifications. Go to
ni.com/badges to test your understanding of engineering fundamentals and best
practices using NI products with these free online assessments.
B. Course Description
TheLabVIEW Core 1 course teaches you programming concepts, techniques, features, VIs, and
functions you can use to create test and measurement, data acquisition, instrument control,
datalogging, measurement analysis, and report generation applications. This course assumes
that you are familiar with Windows and that you have experience writing algorithms in the form
of flowcharts or block diagrams.
The Participant Guide is divided into lessons. Each lesson contains the following:
• An introduction with the lesson objective and a list of topics and exercises.
• Slide images with additional descriptions of topics, activities, demonstrations, and
multimedia segments.
• A set of exercises to reinforce topics. Some lessons include optional and challenge
exercises.
• A lesson review that tests and reinforces important concepts and skills taught in the lesson.
Note For Participant Guide updates and corrections, refer to ni.com/info and
enter the Info Code core1.
If you do not have hardware, you still can complete the exercises. Alternate instructions are
provided for completing the exercises without hardware. You also can substitute other
hardware for those previously mentioned. For example, you can use another NI DAQ device
connected to a signal source, such as a function generator.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | ix
C. What You Need to Get Started
Before you use this course manual, make sure you have all of the following items:
• Computer running Windows 10
• LabVIEW 2020 or later
• NI-DAQmx 20.0 or later
• NI-VISA 20.0 or later
• NI-488.2 20.0 or later
• NI Instrument Simulator and power supply
• Real or simulated NI PCI 6221 or NI USB 6212, with BNC-2120.
•LabVIEW Core 1 course media, from which you install the following folders:
D. Installing the Course Software
Complete the following steps to install the course software.
1. Insert the course media in your computer. The LabVIEW Core 1 Course Setup dialog box
appears.
2. Click Install the course materials.
3. Follow the on-screen instructions to complete installation and setup.
File Locations
Exercise files are located in the C:\Exercises\LabVIEW Core 1 folder assuming that you
installed the files on your root directory.
Solution files are located in the C:\Solutions\LabVIEW Core 1 folder assuming that
you installed the files on your root directory.
E. Course Goals
This course prepares you to do the following:
• Acquire data from hardware
• Analyze and process data
• Visualize and log data
• Develop, debug, and test LabVIEW programs
• Use best practices for reusability, readability, and error management
• Implement a sequencer using a state machine
Directory Table Head
Exercises Contains VIs used in the course
Solutions Contains completed course exercises
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
1
Introduction to
LabVIEW
In this lesson, you are introduced to LabVIEW and common
types of applications that you will be able to build after
finishing this course.
Topics
- Understanding LabVIEW Environment
- Common Types of Applications Used with LabVIEW
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 1-3
A. Understanding LabVIEW EnvironmentLabVIEW is an integrated development environment designed specifically to accelerate the productivity of engineers and scientists.
Copyright 2020 National Instruments
Lesson 1 Introduction to LabVIEW
1-4 | ni.com
Benefits of LabVIEW
First-class hardware integration
LabVIEW integrates with NI and other hardware¬in one environment.
When you’re ready to program an application, LabVIEW helps save development time
with convenient features and a consistent programming framework across all
hardware.
Create your own user interfaces
Developed specifically with engineering and scientific technical data in mind, LabVIEW
includes a comprehensive collection of drag-and-drop controls and indicators that you
can use to quickly create a custom user interface for your application for operator
input, viewing live data, and visualizing analyzed results.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 1-5
```
Extensive analysis and signal processing algorithmsIn LabVIEW, you can select from an extensive number of analysis and signal processing algorithms to get valuable insight into your dataquickly, without needing to spend your resources developing analysis algorithms from scratch.LabVIEW also allows you to use and reuse text-based algorithms written using m file and C syntax.Graphical programmingNative to LabVIEW is an intuitive graphical programming language (G) that uses a dataflow model instead of sequential lines of text code,which enables you to write functional code using a visual layout that resembles your thought process.
```
Copyright 2020 National Instruments
Lesson 1 Introduction to LabVIEW
1-6 | ni.com
B. Common Types of Applications Used with
LabVIEW
Measurement—Acquire and Analyze Measurement Data
You can use LabVIEW applications to acquire measurement data from sensors and
signals using NI data acquisition hardware, then analyze and process data, display and
visualize live data and analyze results on the user interface. In addition, you can log
the data to file for storage, reporting, and future analysis.
Instrument Control—Automate stand-alone instruments.
You can also use LabVIEW applications to control and automate stand-alone benchtop
instruments made by other vendors and acquire data from these instruments.
This allows you to save valuable time by automating manual processes and gives you
the ability to integrate a large variety of hardware into your application.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 1-7
Automated Test
You can use LabVIEW to develop an automated test system that runs a sequence of
tests on a unit or device under test and determine if the device passes or fails.
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
2
First
Measurement
```
(NI DAQ Device)
```
In this lesson, you acquire and validate your first
measurement from an NI DAQ device.
Topics
- Overview of Hardware
- Connecting and Testing Your Hardware
- Data Validation (NI DAQ)
Exercises
Exercise 2-1 Simulating NI Hardware
```
Exercise 2-2 Validating I/O (NI DAQ Device)
```
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-3
A. Overview of Hardware
This section gives an overview of NI DAQ hardware.
NI DAQ Hardware—Overview
NI DAQ Hardware—Acquiring Signals
Data acquisition is the process of measuring an electrical or physical phenomenon with
a computer. By using NI DAQ systems and LabVIEW, you can customize all aspects
of data collection.
A DAQ system consists of a sensor, an NI DAQ device, and a computer.
Types of Signals
Analog Signal Digital Signal
```
Varies Continuously Transfers digital data (on/off, high/low,
```
```
1/0, True/False)
```
Usually voltage or current Usually voltage
Copyright 2020 National Instruments
```
Lesson 2 First Measurement (NI DAQ Device)
```
2-4 | ni.com
Analog Input
Analog Input describes measuring an analog signal and transferring the measurement
to a computer for analysis, display, or storage.
Examples
Examples of analog input signals include the following types of signals.
• Temperature
• High-frequency voltage signal
• Accelerometer
• Microphone
• Strain Gage
• Current
Analog Output
Analog Output describes generating analog signals from your computer and NI
hardware.
To perform a voltage or current output, a compatible device must be installed that can
generate that type of signal.
Examples
Let’s take a look at some examples of analog output.
The analog output example in the figure below outputs a voltage ramp to control the
speed of a fan. As the voltage increases, the fan speed increases. As the voltage
decreases, the fan speed also decreases.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-5
Another analog output example would be to output a stimulus signal to a
unit-under-test. For example, you might need to send a sine wave, square wave, or
triangle wave, as shown in the figure below, with a specific amplitude and frequency
to your unit-under-test to investigate how the unit-under-test responds.
Digital Input
Digital Input describes measuring a digital signal and transferring the measurement to
a computer for analysis, display, or storage.
Examples
Let’s take a look at some examples of digital input.
1 Read the status of a
button or device
```
(on/off)
```
2 Receive a start trigger 3 Read digital protocol
signal
Copyright 2020 National Instruments
```
Lesson 2 First Measurement (NI DAQ Device)
```
2-6 | ni.com
Digital Output
Digital Output describes generating digital signals from your computer and
NI hardware.
Examples
Digital output signals can be used to perform the following actions.
• Control digital or finite state devices, such as switches and LEDs.
• Communicate between devices.
• Send clocks or triggers for control or synchronization.
```
1 Turn an LED (or another
```
```
device) on or off
```
2 Send a start trigger 3 Generate digital
protocol signals
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-7
B. Connecting and Testing Your Hardware
This section discusses how to set up and connect NI DAQ hardware.
1. Install Software and Drivers
Before connecting your hardware, make sure you install LabVIEW and the NI-DAQmx
driver.
In NI Package Manager, go to the Browse Products tab and select Programming
Environments. Then click LabVIEW and Drivers to install it. Note that NI-DAQmx driver
is automatically included in the installation.
Copyright 2020 National Instruments
```
Lesson 2 First Measurement (NI DAQ Device)
```
2-8 | ni.com
2. Connect NI DAQ Hardware to Computer
Then, refer to the user manual for your DAQ device for detailed instructions on how
to connect your NI DAQ hardware to your computer.
3. Configure and Test NI DAQ Device
You can configure and test your device with Measurement & Automation Explorer
```
(MAX).
```
MAX is used to do the following:
• Configure your NI hardware and software
• Back up or replicate configuration data
• Create and edit channels, tasks, interfaces, scales, and virtual instruments
• Execute system diagnostics
• View devices and instruments connected to your system
• Update your NI software
If you don’t have access to NI DAQ hardware you can simulate NI DAQ devices using
MAX as well.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-9
3. Connect Sensors and Signals
Now, you need to connect your DAQ device to the sensors and signals that you want
to measure.
Navigate to and explore the manual for your NI DAQ device to determine how to
connect sensors to your NI DAQ device.
In MAX, you can find guidance on this by viewing the pinout, manual, and
specifications for the device.
To do this, you need to navigate to Devices and Interfaces, where you can see all the
hardware connected to my computer.
You can click your device name and now you can view the pinout diagram. So this
can help you make the physical connections.
Lastly, you can also view the manual and specifications for this device by clicking
these buttons.
Copyright 2020 National Instruments
```
Lesson 2 First Measurement (NI DAQ Device)
```
2-10 | ni.com
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-11
Exercise 2-1:Simulating NI Hardware
Goal
Use NI Measurement & Automation Explorer to examine, configure, and simulate
NI hardware.
Description
You want to create an application using NI Hardware.
In this exercise, you will explore how to configure the NI DAQ device, or simulate the
NI DAQ device if you don’t have the physical hardware.
Implementation
Complete the steps in this section to examine the configuration for the DAQ device
using NI MAX. If you do not have a DAQ device, simulate the NI PCI-6221
multifunction I/O device using the instructions in step 2. You will use this device to
complete the course exercises.
Note Portions of this exercise can only be completed with the use of a real
device and a BNC-2120, shown in the figure. Some of these steps have
alternative instructions for simulated devices.
1. Launch NI MAX from the Windows Start menu.
2. Create simulated hardware.
In the NI MAX, select Devices and Interfaces, and click the Create New
button.
In the Create New dialog box, select Simulated NI-DAQmx Device or Modular
Instrument, and click Finish.
Copyright 2020 National Instruments
```
Lesson 2 First Measurement (NI DAQ Device)
```
2-12 | ni.com
Expand the M Series DAQ tree, and select NI PCI-6221.
Click OK.
Select the simulated device and name it PCI-6221 under the Settings section.
.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-13
Examining the DAQ Device Settings
1. Expand the Devices and Interfaces section.
2. Select the device that is connected to your machine. Green icons represent real
devices and yellow icons represent simulated devices. You might have a different
device installed, and some of the options shown might be different.
MAX displays NI hardware and software in the computer. The device alias appears
in quotes following the device type. The Data Acquisition VIs use this device alias
to determine which device performs DAQ operations. MAX also displays the
attributes of the device such as the system resources that the device uses.
Make sure the device you use is named PCI-6221. To rename a device, right-click
the device and select Rename from the shortcut menu.
3. Click Device Pinouts and explore the pinout information.
Close the dialog box when you are finished.
4. Select the Settings tab to see the information about the last time the device was
calibrated both internally and externally. Not all devices contain calibration
information.
5. If you are using a physical device, right-click the NI-DAQ device, e.g. NI PCI-6221
or NI USB-6212, etc., in the configuration tree and select Self-Calibrate to update
the built-in calibration constants and calibrate the DAQ device using a precision
voltage reference source. When the device has been calibrated, information in the
Self-Calibration section updates. Skip this step if you are using a simulated device.
6. Close NI MAX when finished.
Copyright 2020 National Instruments
```
Lesson 2 First Measurement (NI DAQ Device)
```
2-14 | ni.com
BNC-2120 Terminal Block
A terminal block consists of screw or spring terminals for connecting signals or other sensors.
A cable transports the signal from the terminal block to the DAQ device.
End of Exercise 2-1
```
1 RES/BNC Switch (AI 3)
```
2 Resistor Measurement Screw Terminals
3 Thermocouple Input Connector
4 Temperature Reference
```
5 BNC/Temp. Ref. Switch (AI 0)
```
```
6 BNC/Thermocouple Switch (AI 1)
```
7 Analog Input BNC Connectors
8 FS/GS Switches
9 Analog Output BNC Connector
10 Frequency Range Selection Switch
11 Sine/Triangle BNC Connector
12 TTL Square Wave BNC Connector
13 Sine/Triangle Waveform Switch
14 Frequency Adjust Knob
15 Amplitude Adjust Knob
16 Digital I/O Screw Terminals
17 Digital I/O LEDs
18 User-Defined Screw Terminals
19 User-Defined BNC Connectors
20 Timing I/O Screw Terminals
21 Quadrature Encoder Screw Terminals
22 Quadrature Encoder Knob
23 Timing I/O BNC Connector
24 Power Indicator LED
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-15
C. Data Validation (NI DAQ)
In this section, we will walk through acquiring and generating signals from an NI DAQ
device and exploring and analyzing that data to validate the signal.
Acquire Signals
The next step is to acquire signals.
But before we acquire a signal, let’s make sure that we understand the fundamentals
of choosing the correct sampling rate for an analog input signal.
Analog Input: Sample Rate
```
The following figure shows a sample rate of 10 Hz (samples per second).
```
When you set the acquisition rate for your signal, keep in mind that you should follow
these rules.
Sample Rate The rate at which the DAQ device acquires a sample on each channel.
Copyright 2020 National Instruments
```
Lesson 2 First Measurement (NI DAQ Device)
```
2-16 | ni.com
• You must sample at least greater than 2 times the maximum frequency component
of your signal to accurately represent the FREQUENCY of your signal.
• And typically, you must sample at least 5-10 times greater than the maximum
frequency component of your signal to accurately represent the SHAPE of your
signal.
The following table compares the results of signals acquired at different rates.
Here, we see that the signal that we are trying to acquire is a sine wave that has a
frequency of 100 Hz. This means that the sine shape repeats 100 times per second.
```
If you set your NI DAQ device’s sample rate to 100 Hz (the same frequency as your
```
```
actual signal) your acquired signal for this example will look a straight line, which does
```
not accurately represent the actual signal.
If you set your NI DAQ device’s sample rate to greater than 2 times the actual signal’s
frequency, your acquired signal will accurately represent the actual signal’s frequency.
If you set your NI DAQ device’s sample rate to 10 times the actual signal’s frequency,
your acquired signal starts to accurately represent the actual signal’s frequency and
shape.
```
Demonstration: Acquiring and Visualizing Signals Using MAX
```
Actual Signal Acquired Signal
100 Hz Sine Wave DAQ Sample Rate: 100 Hz Aliased Signal
100 Hz Sine Wave DAQ Sample Rate: 201 Hz Adequately
sampled for
frequency only
```
(Same number of
```
```
cycles)
```
100 Hz Sine Wave DAQ Sample Rate: 1000 Hz Adequately
sampled for
frequency and
shape
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-17
```
Exercise 2-2: Validating I/O (NI DAQ Device)
```
Goal
Verify that the I/O of your DAQ device behaves correctly.
Scenario
You want to validate that your DAQ system acquires/generates the following data
```
correctly:
```
• Acquired analog input voltage measurement from the temperature sensor.
• Generated analog output voltage.
• Generated digital output voltage.
Hardware Setup
```
(BNC-2120) Make sure that you have Sine/Triangle BNC Connector connected to the
```
Analog Input 2, and the Sine/Triangle Waveform Switch is set to Sine.
Implementation
1. Launch NI MAX from the Windows Start menu.
2. Expand Devices and Interfaces and select the PCI-6221 or USB-6212.
Note From here till the end of the course choose the NI-DAQ device that
you have connected to your PC, e.g. if you are using USB-6212, then select
it each time you see PCI-6221 is mentioned.
3. Right-click the device and select Test Panels... from the shortcut menu.
4. Validate the analog input of your device.
Make sure that the Analog Input tab is selected in the Test Panels dialog box.
Select PCI-6221/ai2 from the Channel Name control, which corresponds to the
ai2 pin of the device.
Change Mode to Continuous enables the measurement-specific settings, e.g.
```
Rate (Hz), and Samples to Read.
```
Click the Start button to start the acquisition.
Explore data on the chart, then click Stop.
Change Samples To Read to other values, e.g. 5000, 10000, etc.
Start the acquisition, and explore how it affects the acquired signal.
Copyright 2020 National Instruments
```
Lesson 2 First Measurement (NI DAQ Device)
```
2-18 | ni.com
Click the Stop button.
You can disable the Auto-scale chart option, and change the scaling of the
x-scale to adjust the graph by double-clicking the maximum and minimum
values of the scale and typing the appropriate ones.
5. Validate the analog output of your device.
Switch to the Analog Output tab.
Set the Channel Name control, e.g. PCI-6221/ao0.
You can either change Mode to Voltage Sinewave Generation or leave
Voltage DC.
```
Set Output Value (V) to the constant voltage you want to output.
```
Click the Update button to start the generation.
Click Stop.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-19
6. Validate the digital I/O of your device.
Switch to the Digital I/O tab.
Select the port from the Port Name control. Port is a collection of lines, and
each line can output a high or low voltage.
Select All Output in the Select Direction section.
Configure the output voltage in the Select State section by changing the line
state.
Click Start.
Select All Low and click Stop.
Close the Test Panels dialog box.
7. Close NI MAX.
End of Exercise 2-2
Troubleshoot Unexpected I/O Results
In this section, we will discuss some tips to help troubleshoot if you get unexpected
I/O results from an NI DAQ device.
If you see unexpected input and output results, or I/O results, from your DAQ device,
then try checking the following:
• Correct terminal connections—Make sure terminal connections are secure. Check
the DAQ device pinouts and sensor manuals to make sure the sensor/signal is
wired to the correct DAQ device terminals. For example, if you see a result of -5V
when you expected +5V, you might have the + and - terminal wiring reversed.
• Appropriate sample rate—Refer to guidelines in the sample rate section of this
lesson. Your sample rate might not be high enough to get your desired data.
• Correct channel configuration settings—Double-check if your channel
configuration settings are correct. Channel configuration settings include items
like thermocouple type, minimum/maximum voltage, excitation voltage, and more.
For example, if you choose the wrong thermocouple type, your temperature
reading will be scaled incorrectly.
• Field wiring and noise considerations for analog signals—Refer toField Wiring and
Noise Considerations for Analog Signals document on ni.com for more information
on issues such as grounding and noise.
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-21
```
Activity: Lesson Review
```
1. You are trying to acquire and view a signal using an NI DAQ device. How would
you connect the following components?
2. What type of DAQmx channel do you need to use to acquire the following signal?
a. Analog input
b. Analog output
c. Digital input
d. Digital output
3. What type of DAQmx channel do you need to use to generate the following signal?
a. Analog input
b. Analog output
c. Digital input
d. Digital output
Copyright 2020 National Instruments
```
Lesson 2 First Measurement (NI DAQ Device)
```
2-22 | ni.com
4. What type of DAQmx channel do you need to use to acquire the following signal?
a. Analog input
b. Analog output
c. Digital input
d. Digital output
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 2-23
```
Activity: Lesson Review – Answers
```
1. You are trying to acquire and view a signal using an NI DAQ device. How would
you connect the following components?
2. What type of DAQmx channel do you need to use to acquire the following signal?
a. Analog input
b. Analog output
c. Digital input
d. Digital output
3. What type of DAQmx channel do you need to use to generate the following signal?
a. Analog input
b. Analog output
c. Digital input
d. Digital output
Copyright 2020 National Instruments
```
Lesson 2 First Measurement (NI DAQ Device)
```
2-24 | ni.com
4. What type of DAQmx channel do you need to use to acquire the following signal?
a. Analog input
b. Analog output
c. Digital input
d. Digital output
Copyright 2020 National Instruments
3
First Measurement
```
(Non-NI Instrument)
```
In this lesson, you use LabVIEW to connect to
non-NI instruments and validate the results.
Topics
- Overview of Hardware
- Connecting Non-NI Instruments
- I/O Validation (Non-NI Instrument)
- Troubleshoot Unexpected I/O Results
Exercises
```
Exercise 3-1 Connecting Hardware (Non-NI Instrument)
```
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 3-3
A. Overview of Hardware
This section gives an overview of an instrument control system.
Instrument Control System
Suppose you have a stand-alone instrument from a non-NI vendor, such as Tektronix
or Keysight Technologies. You can control and automate the instrument using
LabVIEW.
LabVIEW can automate instrument-based processes and consolidate multiple
instruments into one development environment.
A basic instrument control system consists of a non-NI instrument, hardware
connectivity, and a computer.
Instruments
Instruments from non-NI vendors include amplifiers, analyzers, calibrators,
oscilloscopes, power supplies, switches, function generators, and more.
Hardware Connectivity
Hardware connectivity refers to the physical cable connecting the instrument and also
the communication protocol or bus.
Common bus types include GPIB, serial, USB, and Ethernet. Different buses have
different capabilities for latency and bandwidth.
Instruments often have multiple ports for hardware connectivity options.
Copyright 2020 National Instruments
```
Lesson 3 First Measurement (Non-NI Instrument)
```
3-4 | ni.com
Computer
Finally, you can use LabVIEW software on your computer to acquire, analyze, and
visualize data from your instruments and to automate and control your instruments.
Example Application—Automate Non NI Instruments
Let’s look at how LabVIEW can help automate an instrument control application.
Suppose you need to determine the cutoff frequency of an RC circuit by sending the
RC circuit a frequency sweep of 100 different sine wave frequencies 1 Hz to 100 Hz.
To do this, you must input sine waves of frequencies between 1 Hz and 100 Hz to
the RC circuit and analyze the output response signals. The function generator sends
these stimulus signals to the RC circuit, and the oscilloscope acquires the RC circuit
response signals.
To do this manually, your steps might look something like this—long and involved,
with a large amount of repetition and increased chance for human error.
1. Configure the function generator to output a 1 Hz sine wave to the input of your
circuit.
2. Read the output response signal of the circuit on an oscilloscope.
3. Save the output response to file on the oscilloscope.
4. Transfer the file to a computer.
5. Configure the function generator to output a sine wave with a higher frequency.
6. Repeat steps two through five 100 times until have tested your circuit with sine
waves of frequencies from 1 Hz to 100 Hz.
7. Using the computer, perform analysis calculations on the data to determine the
cutoff frequency of the RC circuit.
If you programmatically control your function generator and oscilloscope, you can
automate many of the manual steps. This saves an enormous amount of time and
decreases the chances for human error.
Your steps would look something more like this:
1. Run your LabVIEW program, which automatically sets the function generator
output frequency, acquires and logs all the response signals from the oscilloscope,
and performs analysis to calculate and display the cutoff frequency of the RC
circuit.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 3-5
B. Connecting Non-NI Instruments
This section examines how to connect non-NI instruments to your computer.
1. Install Software and Drivers
First, install LabVIEW. Then install any required NI hardware drivers.
1. Install LabVIEW
2. Install required NI hardware driver(s)
NI-VISA driver
```
NI-488.2 driver (if using GPIB instrument)
```
2. Connect non-NI Hardware to Computer
Next, connect the non-NI instrument to the computer.
For example, if you are using a GPIB instrument, then you need a GPIB instrument
control device on your computer, such as a USB-GPIB-HS or PCI-GPIB. Connect the
GPIB instrument control device to your computer, and then use a GPIB cable to
connect the GPIB instrument control device to your instruments.
If you are using a serial instrument, then connect the serial port on your computer to
the instrument with a serial cable.
```
Demonstration: Connect Your Hardware (non-NI instrument)
```
Copyright 2020 National Instruments
```
Lesson 3 First Measurement (Non-NI Instrument)
```
3-6 | ni.com
```
Exercise 3-1: Connecting Hardware (Non-NI
```
```
Instrument)
```
Goal
Connect a non-NI Instrument to your computer, so that the instrument can be
programmatically controlled by LabVIEW.
Scenario
```
You are creating an application that acquires data from a non-NI instrument (for
```
```
example, a non-NI oscilloscope, or non-NI digital multimeter).
```
In this exercise, you will explore how to connect a non-NI instrument to your
computer.
Connect a Non-NI Instrument to Your Computer
For this course, imagine that the NI Instrument Simulator represents a non-NI
oscilloscope instrument that has a GPIB port.
Furthermore, imagine that your computer has a GPIB instrument control device, such
as the GPIB-USB-HS, which allows your computer to communicate with a GPIB
instrument.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 3-7
Complete the following steps to connect the GPIB instrument to your computer.
1. Notice that the NI Instrument Simulator has a GPIB port.
2. Connect the NI Instrument Simulator to your computer GPIB interface with a GPIB
cable. For example, connect the USB end of the GPIB-USB-HS to your computer
and the GPIB end of the GPIB-USB-HS to the GPIB port of the NI Instrument
Simulator.
3. Now you can programmatically control (send commands to, receive data from) the
```
NI Instrument Simulator (that is a non-NI instrument).
```
Implementation
1. Launch NI MAX from the Windows Start menu.
In NI MAX, expand the Devices and Interfaces to display the installed
interfaces. If a GPIB interface is listed, the NI-488.2 software is correctly
loaded on the computer.
Select the GPIB interface.
Examine but do not change the settings for the GPIB interface.
2. Communicate with the GPIB instrument.
Make sure the GPIB interface is still selected in the Devices and Interfaces.
Click the Scan for Instruments button on the toolbar.
Expand the GPIB interface selected in the Devices and Interfaces. An
instrument named Instrument Simulator appears. If the Instrument Simulator
does not appear, please complete the next section—Set Up the NI Instrument
Simulator.
Click Instrument Simulator to display information about it in the right pane
of NI MAX.
Click the Settings tab at the bottom. Notice the NI Instrument Simulator has a
GPIB primary address.
Click the Communicate with Instrument button on the toolbar. An interactive
window appears. You can use it to query, write to, and read from that
instrument.
Enter *IDN? in the Send String text box and click the Query button.
The instrument returns its manufacturer and model number in the String
Received indicator as shown in the figure. You can use this communicator
window to debug instrument problems or to verify that specific commands
work as described in the instrument documentation.
Copyright 2020 National Instruments
```
Lesson 3 First Measurement (Non-NI Instrument)
```
3-8 | ni.com
Enter MEASURE:VOLTAGE:DC? in the Send String text box and click the Query
button. The NI Instrument Simulator returns a simulated voltage measurement.
Click the Query button again to return a different value.
Click the Exit button when done.
3. You can communicate with your non-NI instrument using VISA Test Panel as well.
Select your instrument and click the Open VISA Test Panel tab.
Navigate to the Input/Output and enter your SCPI command.
4. Set a VISA alias of MyGPIBInstrument for the NI Instrument Simulator so you can
use the alias instead of having to remember the primary address.
While Instrument Simulator is selected in NI MAX, click the VISA Properties
tab.
Enter MyGPIBInstrument in the VISA Alias on My System field. You use this
alias later in the course.
Click Save.
5. Exit NI MAX.
6. Click Yes if prompted to save the instrument.
7. Close all opened programs and windows.
End of Exercise 3-1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 3-9
C. I/O Validation (Non-NI Instrument)
This section discusses how to communicate with a non-NI instrument and validate
that you get the correct results.
Configure Your Instrument in NI MAX
After connecting your non-NI instrument to your computer, if you have a GPIB, serial,
or Ethernet instrument, you will need to configure your instrument in NI MAX
```
(Measurement & Automation Explorer).
```
To configure a GPIB instrument in NI MAX you have to:
1. Expand Devices and Interfaces.
2. Click the GPIB instrument control device icon and then click the Scan for
Instruments button, which returns all the GPIB instruments connected to your
GPIB instrument control device.
On the Properties tab, notice that the default name for the instrument is based on a
string containing the GPIB board number, primary address, and instrument.
You can set a VISA alias for the instrument, so you can identify the instrument more
easily in LabVIEW.
Find and Install Specific Instrument Driver
Next, you should find and install the specific instrument driver for your
non-NI instrument.
To do this launch the NI Package Manager and search for the instrument driver for your
instrument. driver. Follow the prompts to install the instrument driver. You can also
search for instruments by vendor and model number.Copyright 2020 National Instruments
```
Lesson 3 First Measurement (Non-NI Instrument)
```
3-10 | ni.com
Validate the Instrument I/O
Most instrument drivers include example programs that allow you to start
communicating with the instrument right away. The instrument driver example
programs also help you learn how to use the driver and provide a starting point for
your own instrument control application.
Run the instrument driver example programs to quickly access and validate the
instrument I/O.
```
Demonstration: Validating Non-NI Instrument I/O
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 3-11
What if no instrument driver exists for your
non-NI instrument?
If no instrument driver exists for your non-NI instrument, you will need to
```
communicate with the instrument using SCPI (Standard Commands for Programmable
```
```
Instrument) commands.
```
In this example, the computer sends a *IDN? SCPI command to the instrument, which
asks the instrument to identify itself. The instrument responds to this command by
returning a <company name>, <model number>, <serial number>,
<firmware revision> string.
Refer to your instrument’s manual to determine which SCPI commands work with your
instrument.
Troubleshoot Unexpected I/O Results
In this section, we will discuss some tips to help troubleshoot if you get unexpected
results when communicating with a non-NI instrument.
Here are the steps you should follow if you get unexpected I/O results:
1. Double-check cable (serial, GPIB, USB) connections.
2. Verify that non-NI instruments show up in NI MAX.
3. Refer to your non-NI instrument’s manual.
4. Verify that you can get measurements by manually operating the instrument.
5. Contact the manufacturer to check for updated drivers.
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 3-13
```
Activity: Lesson Review
```
1. Which of the following are benefits of instrument control? (multiple answers)
a. Automate processes
b. Improve productivity and repeatability
c. One platform for multiple tasks
d. Limited to only one type of instrument
2. You are trying to acquire and view a signal using a non-NI GPIB instrument. How
would you connect the following components?
Copyright 2020 National Instruments
```
Lesson 3 First Measurement (Non-NI Instrument)
```
3-14 | ni.com
```
Activity: Lesson Review—Answers
```
1. Which of the following are benefits of instrument control? (multiple answers)
a. Automate processes
b. Improve productivity and repeatability
c. One platform for multiple tasks
d. Limited to only one type of instrument
2. You are trying to acquire and view a signal using a non-NI GPIB instrument. How
would you connect the following components?
Copyright 2020 National Instruments
4
Exploring an
Existing
Application
In this lesson, you explore an existing application and
predict its behavior.
Topics
- Exploring a LabVIEW Project
- Parts of a VI
- Understanding Dataflow
- Searching Example Code
Exercises
Exercise 4-1 Exploring an Existing Project and a VI
```
Exercise 4-2 Exploring Hardware Example Programs (Optional)
```
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-3
A. Exploring a LabVIEW Project
Project Explorer Items
This is an example of a project in LabVIEW. The Project Explorer window includes the
following items by default:
1 Project root— Contains all other items in the Project Explorer window. The label
on the project root includes the filename for the project.
2 My Computer—Represents the local computer as a target in the project.
3 Dependencies—Includes LabVIEW programs and their required items.
4 LabVIEW Project—Each LabVIEW project has one LabVIEW project file, which
has a .lvproj file extension.
5 Build Specifications—Includes build configurations for source distributions and
other types of builds available in LabVIEW toolkits and modules. If you have the
LabVIEW Professional Development System or Application Builder installed, you
can use Build Specifications to configure stand-alone applications, shared
libraries, installers, and zip files.
1
2
3
4
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-4 | ni.com
LabVIEW Files
LabVIEW uses different types of files. In this course you learn about three types of
LabVIEW files – LabVIEW projects, VIs, and custom controls.
LabVIEW programs are called virtual instruments, or VIs, because their appearance
and operation imitate physical instruments, such as oscilloscopes and multimeters.
Today LabVIEW VIs can be extremely powerful and sophisticated programs with
elegant graphical user interfaces.
Later in this course you learn how custom controls can improve maintainability of your
LabVIEW application.
LabVIEW projects can also include non-LabVIEW file types. For example, you can
include documentation files.
1 LabVIEW Project - .lvproj
2 Custom Control - .ctl
3 Virtual Instrument - .vi
3
1
2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-5
Adding Files/Folders to a Project
Right-clickatargetintheProjectExplorerwindowtocreatefilesandfolders.
Two types of folders are available:
Virtual folder:
• Organizes project items and does not represent the files on disk.
• You can convert a virtual folder to an auto-populated folder.
Auto-populating folder:
• Adds a directory on disk to the project.
• LabVIEW continuously monitors and updates this folder according to changes
made in the project and on the disk.
```
Demonstration: Exploring an Existing Project
```
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-6 | ni.com
B. Parts of a VIThis section discusses how to recognize and understand the difference between the front panel and block diagram.Demonstration: Parts of a VILabVIEW VIs contain two main components—the front panel and the block diagram.
##### Front Panel

Block Diagram
Is the user interface.

Contains the graphical source code.
```
Has controls (inputs) and indicators (outputs)
```

Contains terminals for front panel controls and indicators.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-7
Front PanelRecognize the components and functionality of the front panel, and select appropriate controls and indicators.Front Panel ToolbarOn the Front Panel, you use the toolbar to control the VI execution. For example, Run, Run Continuously, Abort Execution or Pause theexecution.
¬
Also you can use the toolbar to select the Text Settings, Align/Distribute/Resize/Reorder the Objects, search items, and open the contexthelp.
¬
##### Front Panel

User interface for the VI. Contains controls and indicators, which are the interactive input and output terminals ofthe VI, respectively.
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-8 | ni.com
Controls Palette
Controls Palette contains the controls and indicators you use to create the front panel.
Note Front panel objects appear as terminals on the block diagram.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-9
Controls and Indicators
Controls are inputs.
For example, the user can use this control to input the number of measurements to
the VI.
Indicators are outputs.
For example, this VI uses these indicator to output the measured signal to the user.
Introduction to Front Panel Object Data Types
A data type defines what kind of operations can be performed on a particular value.
In LabVIEW every object and wire is always associated with some data type.
Here is a list of data types for objects on the¬ front panel.
• Numeric
• Boolean
• String
• Array
• Waveform
• Hardware Resource
Controls Indicators
Interactive input Interactive output
Knobs, push buttons, dials, and other inputs Graphs, LEDs, and other displays
Supply data to the block diagram Display data from the block diagram
```
Controls: Inputs Indicators: Outputs
```
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-10 | ni.com
Numeric Data Type
The numeric data type can represent numbers of various types, such as integer or real.
A numeric control allows a user to input a numeric value. Notice the increment and
decrement buttons.
A numeric indicator displays and outputs a numeric value to the user.
In LabVIEW, controls typically have white backgrounds, and indicators typically have
grey backgrounds.
Boolean Data Type
The Boolean data type represents data that only has two possible states, such as True
and False or On and Off.
Use Boolean controls and indicators to enter and display Boolean values.
String Data Type
The string data type is a sequence of ASCII characters.
1 Increment/Decrement Buttons
1 Scrollbar
1
1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-11
A string control allows a user to input text and typically has a white background.
A string indicator displays and outputs text to the user and typically has a grey
background.
Notice that string controls and indicators can also include a scrollbar, if necessary.
Array Data Type
The array data type groups multiple elements of the same data type. In this example,
the array is a collection of numeric elements.
A numeric array can be visualized as a list of numeric values or as a plot where each
point represents a different numeric value.
Waveform Data Type
The waveform data type consists of an array of data values along with timing
information like the start time and time interval between data points.
Notice that the waveform graph indicator displays both the data values and the timing
information in seconds.
1 Data point
1 Timing Data
2 Data Values
1
1
2
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-12 | ni.com
Hardware Resource Data Types
Hardware resource data types allow you to select the specific hardware resource you
want to access.
For example, you can do the following:
• You can use the DAQmx Task Name control to select which DAQmx measurement
task you want to access.
• You can use the DAQmx Physical Channel control to specify which DAQmx
channel you want to acquire data from.
• You can use the VISA Resource Name control to select which GPIB instrument you
want to communicate with.
Accessing Object Properties
To access the properties of a front panel object, right-click the object and select
Properties.
For example, this numeric control has a property that tells the numeric control to
display 6 significant digits on the front panel.
```
Demonstration: Exploring Properties of Front Panel Objects
```
Front Panel Object Properties Dialog Box
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-13
Block Diagram
Recognize features of the block diagram and be able to select block
diagram objects.
Block Diagram Toolbar
On the block diagram, you can use the toolbar to run the VI, control the VI execution,
and debug the VI.¬
You can also use the toolbar to select the Text Settings, Align, Distribute, Resize, or
Reorder the Objects, to clean-up the diagram, to search for items and open the
Context Help.
Block Diagram Block Diagram objects include terminals, subVIs, constants,
structures, and wires, which transfer data among other
diagram objects.
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-14 | ni.com
Functions Palette
The Functions palette contains the VIs, functions, and constants you use to create the
block diagram and code your application.
```
Demonstration: Components of a Block Diagram
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-15
Wires
Wires transfer data between block diagram objects.
Here are some examples of how wires have different styles and colors to represent
different data types.
Note If the data types are not compatible, the wire will be broken.
The input of Increment function accepts the following data types:¬
• Number¬
• Timestamp¬
• Analog Waveform
This input also accepts an array or an array of clusters of the listed data types.¬
```
Demonstration: Context Help and LabVIEW Help
```
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-16 | ni.com
Exercise 4-1: Exploring an Existing Project and a VI
Goal
• Explain the purpose of the main LabVIEW project/VI development environment
items.
• Differentiate between controls and indicators.
• Differentiate between numeric, Boolean, and string data types.
Explore an existing project
1. Open Explore Existing Project.lvproj in the C:\Exercises\
LabVIEW Core 1\Explore Existing Project directory.
2. Notice that the Project Explorer window contains the following two items.
Thermocouple task
Temperature Acquisition VI
3. Explore the Thermocouple task.
Double-click the Thermocouple task to launch DAQ Assistant.
In the opened window you can configure the DAQmx task by changing
different values of sample rate, samples to read, signal input range, and by
adding physical and virtual channels to the task.
Configure the Thermocouple task as shown in the figure below.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-17
Explore and run the VI in the project
1. Open the VI in the project.
In the Project Explorer window, double-click the Temperature Acquisition VI.
2. Run the VI.
Notice that Current Temperature displays the temperature.
Run the VI a couple more times.
Set Max Temperature Threshold to values above and below the current
temperature, and observe how this affects the Threshold Exceeded? and
Message indicators.
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-18 | ni.com
Explore the VI Front Panel
The front panel is the user interface of your VI.
1. Examine the VI front panel.
2. Determine whether each of the following front panel objects is a control (front
```
panel input) or indicator (front panel output), and circle the correct answer.
```
Max Temperature Threshold Control | Indicator
Current Temperature Control | Indicator
Threshold Exceeded? Control | Indicator
Message Control | Indicator
3. Determine whether each of the following front panel objects is a numeric, boolean,
or string, and circle the correct answer.
Max Temperature Threshold Numeric | Boolean | String
Current Temperature Numeric | Boolean | String
Threshold Exceeded? Numeric | Boolean | String
Message Numeric | Boolean | String
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-19
Explore the Block Diagram
The block diagram defines the functionality of the VI and contains the code for the VI.
1. Select Window»Show Block Diagram in the front panel toolbar to display the block
diagram.
On the block diagram, identify the following items. How many can you find of
each item?
– Controls
– Indicators
– Constants
– Free labels
– Functions
– VIs
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-20 | ni.com
2. Use the context help to learn more about the items on the block diagram.
Press <Ctrl-H> to open the Context Help window or select Help»Show
Context Help.
Move the Context Help window to a convenient area where the window does
not hide part of the diagram.
Place your cursor over each of the different color wires to see which data type
they represent.
The Context Help window content changes to show information about the
object that your mouse is over.
3. Get detailed help for the Select function.
1 Select function—Place your cursor over the function. In the Context Help
window, click the Detailed help link to launch theLabVIEW Help and learn more
about this function.
1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-21
Check Your Answers
1. Refer to the following figures to verify that you identified all items correctly.
On the Job
Describe the controls and indicators that you need when you create VIs at work.
```
(name, data type)
```
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
___________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________ ___________________________________________________________________________
_______
End of Exercise 4-1
1 Numeric Control
2 Numeric Indicator
3 Boolean Indicator
4 String Indicator
1 Comments
2 Functions
3 VIs
4 Indicators
5 Control
6 Constants
1
2
3
4
1
23
4
5
6
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-22 | ni.com
C. Understanding Dataflow
This section discusses how to recognize characteristics of dataflow on the block
diagram.
Key Points of Dataflow
LabVIEW uses a dataflow model for running VIs.
The rules of dataflow are as follows.
First, a node can only execute when data are available at all of its required inputs.
Then, the node executes.
Finally, a node supplies data to its outputs only after the node has finished executing.
So, it’s the flow of data that determines the execution order of block diagram nodes.
Therefore, a block diagram can have simultaneous operations.
Dataflow Dataflow is the movement of data through the nodes of a block
diagram.
1 A node executes only when all input data are available.
2 A node supplies data to the output terminals only when it finishes executing.
1 2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-23
```
Activity: Exploring DataflowGoal:
```
Understand how dataflow determines the execution order in a VI.
Description
: Work through this exercise on your own first, and then as a class, we will discuss how data flow determines execution order. You can find
answers to these questions following this section.
Note

Nodes are objects on the block diagram that have inputs and/or outputs and perform operations when a VI runs.
Using the following figure, answer questions 1 through 4.1.

Which node executes first? Is there any dependency between the TDMS Open function and the Sine Wave VI?
2.

Which node executes last?
3.

How many nodes must execute before the TDMS Write node can execute?
4.

Should a well-designed block diagram flow in a particular direction?
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-24 | ni.com
5.

In following figure, which node executes last?
6.

In the following figure an error wire connects the nodes. Which node executes last?
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-25
7.

In the following figure, which Extract Single Tone Information VI executes last?
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-26 | ni.com
```
Activity: Exploring Dataflow – Answers
```
1. Which node executes first? Is there any dependency between the TDMS Open
```
function and the Sine Wave VI?
```
Either the TDMS Open function or the Sine Wave VI can execute first. There is no
data dependency between the two nodes so either of them can execute first or
they can execute simultaneously.
2. Which node executes last?
The last node to execute is the TDMS – File Viewer VI.
Note Terminals are not considered nodes.
3. How many nodes must execute before the TDMS Write function can execute?
Two nodes must execute before the TDMS Write function can execute: TDMS
Open, and Sine Waveform. The TDMS Write node also depends on the Simulated
Signal string constant, but that input is instantaneous.
4. Should a well-designed block diagram flow in a particular direction?
Yes. A well-designed block diagram typically flows from left to right. This makes
it easier to see the flow of data on the block diagram. However, do not assume
left-to-right or top-to-bottom execution when no data dependency exists.
5. In the following figure, which node executes last?
Either the Mean VI or the Write Delimited Spreadsheet VI executes last or they
execute in parallel. The DAQmx Read VI cannot execute last because both the
Mean VI and the Write Delimited Spreadsheet VI are dependent on the data signal
from the output of the DAQmx Read VI.
Note In LabVIEW, the flow of data, rather than the sequential order of
commands, determines the execution order of block diagram elements.
Therefore, it is possible to have simultaneous operations.
6. In the following figure an error wire connects the nodes. Which node executes
last?
The Write Delimited Spreadsheet VI executes last. It has a data dependency on
both the DAQmx Read and Extract Single Tone Information VIs.
7. In the following figure, which Tone Measurements node executes last?
Either one of the Extract Single Tone Information VIs can execute last. Even
though the bottom Extract Single Tone Information VI has an extra dependency
on the filter VI, the filter VI might execute before the top Extract Single Tone
Information node allowing the bottom Extract Single Tone Information node to
execute before the top Extract Single Tone Information node. Although it seems
as if the top Extract Single Tone Information node would execute first, without an
explicit data dependency there is no way to know definitely it would execute first.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-27
D. Searching Example Code
This section discusses how to find example code.
Examples
To find example code, go to the Help menu and click Find Examples. Here, you can
browse and search for many executable LabVIEW programs.
You can start from a working example VI and modify it to fit your application needs.
You can also copy and paste code from an example into your own VI.
```
Demonstration: Finding Examples
```
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-28 | ni.com
Exercise 4-2: Exploring Hardware Example Programs
```
(Optional)
```
Goal
Explore hardware example programs included in LabVIEW.
Instructions
NI-DAQmx Example Programs
1. Explore NI-DAQmx examples.
1 From the Getting Started window, open the Help menu.
2 Select Find Examples.
1
2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-29
2. In the NI Example Finder window, double-click Hardware Input and Output»
DAQmx, double-click the folder for the type of example you want to explore, and
then double-click one of the examples to launch an example DAQmx project.
3. Explore the VIs found in the launched example.
Open and explore the VIs from the DAQmx subfolders.
Explore the front panel.
Explore the block diagram. You can read a description of a VI by using the
Context Help window.
4. Close the VI when finished. If you save an example, it will save over the original
example. In order to prevent that you should choose “Save as Copy” or don’t save
the VI.
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-30 | ni.com
Non-NI Instrument Example Programs
1. Explore Non-NI Instrument Examples.
Switch to NI Example Finder and navigate to Hardware Input and Output»
Instrument Drivers»LabVIEW Plug and Play folder.
2. Select the instrument driver example that you want to explore to launch an
example instrument driver VI.
If you are taking this course in a classroom with an NI Instrument Simulator, you
can explore the NI Instrument Simulator instrument driver example.
3. Explore the VIs found in the launched example.
Open and explore the VIs from the Instrument Drivers subfolder.
Explore the front panel.
Explore the block diagram. Remember, you can read a description of a node
by using the Context Help window <Ctrl-H>.
4. Close the VI when you are finished. Do not save the VI.
End of Exercise 4-2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 4-31
```
Activity: Lesson Review
```
1. In the following figure, which function executes first: Add or Subtract?
a. Add
b. Subtract
c. Cannot be determined
2. In the following figure, which function executes first?
a. Sine
b. Add
c. Unknown
3. In the following figure, which function executes first: Random Number, Add, or
Subtract?
a. Random Number
b. Subtract
c. Add
d. Unknown
Copyright 2020 National Instruments
Lesson 4 Exploring an Existing Application
4-32 | ni.com
```
Activity: Lesson Review — Answers
```
1. In the following figure, which function executes first: Add or Subtract?
a. Add
b. Subtract
c. Unknown
2. In the following figure, which function executes first: Sine or Add?
a. Sine
b. Add
c. Unknown
3. In the following figure, which function executes first: Random Number, Add, or
Subtract?
a. Random Number
b. Subtract
c. Add
d. Unknown
Copyright 2020 National Instruments
5
Creating Your
First Application
In this lesson, you create your first application.
Topics
- Creating a New Project and a VI
- Explore LabVIEW Data Types
- Building an Acquire-Analyze-Visualize VI (NI DAQ)
- Building an Acquire-Analyze-Visualize VI (Non-NI Instrument)
Exercises
Exercise 5-1 Creating a Simple Project and a VI
Exercise 5-2 Creating an Acquire-Analyze- Visualize VI
```
Exercise 5-3 DAQmx Task vs Full DAQmx API (Optional)
```
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-3
A. Creating a New Project and a VI
In this section, we will create a new project and VI.
```
Demonstration: Creating a Project and a New VI
```
Activity 5-1: Select Front Panel Objects
Goal
For each scenario, determine the appropriate data type and whether the front panel
object should be a control or indicator.
Scenario Data Type Control/Indicator
Display the temperature
of a room
Numeric Indicator
An Emergency stop
button to stop a process
Username and password
to login to your bank
account
An LED to indicate
presence of an error
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-4 | ni.com
```
Demonstration: Using Cursor Tools
```
```
Demonstration: Wiring Tips
```
```
Demonstration: Additional Ways to Search for Controls and
```
Functions
Making Code Readable.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-5
Exercise 5-1: Creating a Simple Project and a VI
Goal
Create a new project and a new VI that executes the straight-line
```
equation:y = mx + b.
```
Instructions
1. Create a new project.
From the Getting Started window, select Create Project.
As a starting point, choose Blank Project, and click Finish.
2. Save the project.
Select File»Save All.
Type Simple VI in the File Name field.
In the File Explorer window, browse to the C:\Exercises\LabVIEW Core
1\Simple VI directory.
Click OK.
3. Create a new VI in your project.
In the Project Explorer window, select File»New VI.
Save the VI as Straight-Line Equation.Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-6 | ni.com
4. Explore the Controls Palette on the front panel.
Use palettes to locate items when you want to explore the options available to you
or when you are not sure of the name of the control, or indicator you need.
From the front panel toolbar, select View»Controls Palette, or right-click in the
front panel.
Note You can access the NXG Style controls palette by right-clicking in the
front panel and hovering your mouse over NXG Style submenu. Also, if you
want for NXG Style controls palette to open automatically when you click
in the front panel press the pin button in the upper-left corner and drag the
NXG Style controls palette to the top of the stack.
Open the Numeric, Boolean, and String&Path palette categories to explore
various types of controls and indicators.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-7
5. Create the user interface for your VI on the front panel.
Press the Search button on the top right corner of the Controls palette.
Tip Press <Ctrl-Space> to quickly access the search box.
Type numeric control in the search text box.
```
Click Numeric Control (NXG Style) in the search results.
```
Drag it to the front panel. Do this three times to place three numeric controls
```
on the front panel. Rename them as Slope (m), Y-Intercept (b), and x.
```
Press <Ctrl-Space> to open the Quick Drop dialog box.
Type numeric indicator in the search text box.
```
Double-click Numeric Indicator (NXG Style) in the search results and place it
```
on the front panel. Rename it y.
Arrange the items on the front panel as shown in the following figure.
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-8 | ni.com
6. Develop the code for your VI on the block diagram.
Switch to block diagram by pressing <Ctrl-E>.
The block diagram contains the terminals of the controls and indicators, placed
```
on the front panel. In this case it will contain the Slope (m), Y-Intercept (b), x,
```
and y terminals as shown in the figure below.
Press <Ctrl-Space> and type multiply in the search text box. Double-click
Multiply in the search results and place the Multiply function on the block
diagram.
Place an Add function to the block diagram.
Wire the block diagram as shown in the following figure.
7. Locate the palette that contains a particular VI or function using the palette search.
Right-click in the block diagram, press the Search button in the upper right
hand corner of the Functions palette and search for the term Multiply.
In the search results, double-click the desired function to display the palette
category that contains the function. This allows you to browse related
functions.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-9
8. Practice using the global search feature.
Type Multiply in the Search bar in the upper right hand corner of either front
panel or block diagram.
Note As you type, the global search automatically looks for matches in
several places, including online Help and LabVIEW palettes.
Examine the search results.
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-10 | ni.com
9. Test the Straight-Line Equation VI using the values given in the following table.
Enter the input values in the controls.
Click Run.
For each set of inputs, compare the given outputs to the outputs listed in the
following table. If the VI works correctly, they should match.
Your Turn
1. Create a new project and name it Average.lvproj.
2. Add a new VI named Average.vi to the project.
3. Modify the VI to calculate the average of 5 numbers.
```
(X1 + X2 + X3 + X4 + X5) / 5 = Average
```
4. Run the VI and verify that you get the correct results.
End of Exercise 5-1
Input Output
```
Slope (m) 2 y 7
```
x 1
```
Y-Intercept (b) 5
```
```
Slope (m) 2 y 15
```
x 5
```
Y-Intercept (b) 5
```
```
Slope (m) -3 y -16
```
x 2
```
Y-Intercept (b) -10
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-11
B. Explore LabVIEW Data Types
This section discusses how to create and configure common data types that you will
use in your applications.
Boolean Data Type
Use Boolean controls, indicators, and constants to enter and display Boolean, or
TRUE/FALSE values. Boolean controls and indicators should be used to represent
items that can have only two values such as yes/no, true/false, or on/off.
Here we see some common examples of Boolean controls and indicators.
Use Boolean controls when you want the user to specify whether to log data to file,
choose between serial and GPIB communication, turn the power off or on, or click a
button.¬
Boolean indicators are often used to signal when a threshold has been exceeded or to
indicate when a digital line is high or low.
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-12 | ni.com
```
Demonstration: Create and Configure Boolean Controls and
```
Indicators
Which Boolean mechanical action is the most appropriate for each of the controls
shown in figure above?
Numeric Data Type
Here, you see common examples of how you might use a numeric data type.
• Allow the user to specify how many samples to read from the acquisition
hardware
• Display a measurement result
• Use a numeric constant, such as a mathematical constant or conversion factor
Boolean Control Mechanical Action
Logging
Communication
Power
Acquire Data
Stop Button
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-13
Choosing the Right Numeric Data
To ensure that your VI functions effectively and efficiently, it is important to select
the appropriate format for your numeric data. In LabVIEW, we call these formats
representations.
```
Multimedia: Numeric Data Representations
```
LabVIEW represents numeric data as floating point numbers, fixed point numbers,
integers, unsigned integers, and complex numbers. Numeric data types differ in two
```
ways: the number of bits they use to store data, and the data values they represent.
```
Complete the multimedia module,Numeric Data Representations, available in the
```
C:\Exercises\LabVIEW Core 1\Multimedia\Numeric Data Representationsfolder.
```
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-14 | ni.com
```
Demonstration: Choosing Numeric Data Representations in
```
LabVIEW
```
Demonstration: Avoiding Coercion
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-15
String Data Type
A string is a sequence of displayable or non-displayable ASCII characters. Strings
provide a platform-independent format for information and data. Some of the more
common applications of strings include the following:
• Creating simple text messages.
• Controlling instruments with text commands
• Storing numeric data to disk. To store numeric data in an ASCII file, first convert
data to strings.
• Instructing or prompting with dialog boxes.
Here, we see some examples of using the string data type.
• Use a string control to allow the user to input their user name.
• Use a string indicator to display the status string to the user.
• Use string constants on the block diagram.
```
Demonstration: Create and Configure String Control
```
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-16 | ni.com
Enumerated Data Type
On the front panel, an enum appears as a pre-defined list of items and the user can
select one item.
On the block diagram, the enum represents the selected item as an integer.
In this example, Voltage is represented as a 0 on the block diagram and Temperature
is represented as ¬1.
Using an enum is useful if you would like to limit the user to only pre-defined items to
choose.
The enumerated data types are used with case structures, we’ll explore them detailed
in further lessons.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-17
```
Demonstration: Front Panel Object Styles
```
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-18 | ni.com
C. Building an Acquire-Analyze-Visualize VI
```
(NI DAQ)
```
This section discusses how to build a VI that acquires, analyzes, and visualizes data
from an NI DAQ device.
```
Acquire (NI DAQ Device)
```
Use the DAQ Assistant Express VI to get started with acquiring data from NI¬DAQ
in a VI.
The DAQ Assistant Express VI is good for finite sample acquisition or generation and
for slow-rate continuous acquisition or generation applications.
Getting started with acquiring data from NI DAQ in a VI
1. Create a DAQmx Task.
2. Use the DAQmx Task in the VI.
```
Demonstration: Creating a Simple VI
```
```
Demonstration: Creating a DAQmx VI Using a DAQmx Task
```
```
(Single Channel, Single Sample)
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-19
Building an Acquire-Analyze-Visualize VIThis is an example of a VI that acquires, analyzes and visualizes data.1

Acquire
—This section of code acquires data. This VI acquires a temperature from a thermocouple measurement
¬ task.
2
Analyze
—This section of code analyzes the acquired data. In this example, the analysis code checks if the acquired temperature exceeds
a maximum threshold and selects a corresponding string.
3
Visualize
—This section visualizes data by displaying relevant data on indicators on the front panel. You can also visualize data by logging
it to file.
We will discuss writing data to file in a later lesson.
1
2
3
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-20 | ni.com
Exercise 5-2: Creating an Acquire-Analyze-
Visualize VI
Goal
Create a simple VI that acquires data, analyzes data, and displays the results.
Create the Project
1. Create a new project.
From the Getting Started window, select Create Project»All»Blank Project and
click Finish.
Select File»Save All and enter Acquire Analyze Visualize.lvproj in the File
name field.
Browse to the C:\Exercises\LabVIEW Core 1\Acquire Analyze Visualize
directory and click OK.
Create an NI-DAQmx Task
1. Create a DAQmx task.
In the Project Explorer window right-click My Computer and select New»
NI-DAQmx Task.
2. Configure the measurement.
In the Create New dialog box that appears, select Acquire Signals»Analog
Input»Temperature»Thermocouple.
Name the task Thermocouple, and click Finish.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-21
The next dialog box that appears prompts you to select the physical channel
to use with your new task. Under PCI-6221, select ai1 and click Next.
Name the task Thermocouple, and click Finish.
In the DAQ Assistant dialog box, configure the task as shown in the following
figure.
Note You should configure the task according to your specific hardware
configuration, e.g. if you have a thermocouple connected of a different type
and with different signal input range connected, then you should configure
the parameters accordingly to that thermocouple characteristics.
3. Validate the signal is correct using the DAQ Assistant dialog box.
On the top pane of the dialog box, switch the Display Type to Chart and run
the task to verify that the chart displays the expected temperature.
Click Stop to stop the acquisition.
Click <Ctrl-S> to save the VI and name it Acquire Analyze Visualize.
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-22 | ni.com
Acquire Data
1. Create a new VI in your project.
In the Project Explorer window, add a VI.
Click <Ctrl-S> to save the VI and name it Acquire Analyze Visualize.
2. Modify the block diagram, as shown in the following figure, to acquire data.
Note Task constant populates with any DAQmx tasks that you have
created in this project.
DAQmx Read Configuration Settings
3. Switch to Front Panel.
4. Run the VI. Your VI returns a single temperature acquired from the DAQ device.
1 DAQmx Start Task VI—Transitions the task to the running state to begin the
measurement or generation.
2 Task constant—Right-click the task in input of the DAQmx Start Task VI and
select Create Constant. Set the constant to Thermocouple.
3 DAQmx Read VI—In the Polymorphic VI selector, set the values shown in the
table below.
4 DAQmx Clear Task VI—Clears the task. Before clearing, this VI aborts the task,
if necessary, and releases any resources the task reserved.
5 Simple Error Handler VI—Indicates whether an error occurred. If an error
occurred, this VI returns a description of the error and optionally displays a dialog
box.
```
6 Current Temperature (deg C) indicator—Right-click the data output of the DAQmx
```
Read VI and select Create Indicator. Rename the indicator Current Temperature
```
(deg C).
```
Channel Type Analog Input
Channel Count Single Channel
Sample Count Single Sample
```
Data Format DBL (Floating Point)
```
2 1 3 4
6
5
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-23
Analyze and Visualize Data
1. Modify the block diagram, as shown in the following figure, to analyze the
acquired data.
2. Create the front panel, as shown in the following figure, to visualize your results.
```
Right-click the Maximum Threshold (deg C) control and select Replace»
```
```
Numeric»Horizontal Pointer Slide (NXG Style). Resize the control as desired.
```
Double-click the minimum and maximum values on the Horizontal Pointer Slide
control and set them according to the table below.
1 Greater? function—Add a Greater? function to the block diagram.
2 Input terminal—Right-click the y input of the Greater? function, select Create
```
Control and rename the terminal Maximum Threshold (deg C).
```
3 Boolean indicator—Right-click the output of the Greater? function and select
Create Indicator. Rename the indicator Threshold Exceeded?
4 Select function—Add a Select function to the block diagram.
5 String constant—Add a string constant to the block diagram and wire it to the t
input of the Select function. Set the value of the constant to S ystem in danger
of overheating. Turn on the fan!
6 String constant—Right-click the f input of the Select function and select Create
Constant. Set the value of the constant to System is normal.
7 String indicator—Right-click the output of the Select function, select Create
Indicator, rename it Message.
Minimum 15
Maximum 20
12
3
75
6
4
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-24 | ni.com
Right-click the Horizontal Pointer Slide control and select Data Entry from the
shortcut menu. Set the properties on the Data Entry tab as shown in the
following figure.
Set the current value of the Horizontal Pointer Slide control to 30. After that,
right-click the control and select Data Operations»Make Current Value Default
from the shortcut menu.
Right-click the Threshold Exceeded? indicator and select Replace»Boolean»
```
LED (NXG Style). Resize the indicator as desired.
```
Resize the Message indicator to be larger.
3. Run the VI. Adjust the Maximum Threshold control to be above and below the
```
Current Temperature (deg C), and compare the indicator results.
```
Your Turn
1. Add a new VI named Celsius and Fahrenheit.vi to the project.
2. Modify the VI to acquire a temperature, display the temperature in degrees
Celsius, convert the temperature to display the temperature in degrees Fahrenheit.
The VI should have the following indicators.
```
Current Temperature (deg C)
```
```
Current Temperature (deg F)
```
```
(Hint) Formula for converting deg Celsius to deg Fahrenheit:
```
degrees Fahrenheit degrees Celsius 95--- 32+u=
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-25
3. Run the VI. Use a calculator to verify that the conversion between Celsius and
Fahrenheit is correct.
End of Exercise 5-2
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-26 | ni.com
```
Demonstration: Creating a DAQmx VI Using DAQmx
```
```
Task(Single Channel, Multiple Samples)
```
Array and Waveform Data Types
You will learn how to create and use array and waveform data types in a later lesson.
DAQmx Task vs. Full DAQmx API
When acquiring data from an NI DAQ device, you can take the DAQmx Task Approach
or the Full DAQmx API Approach. The Full DAQmx API approach replaces the DAQmx
task with DAQmx VIs.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-27
DAQmx Task Approach
• The DAQmx task approach is intended to help you get started.
• To help simplify your initial ease-of-use, the channel, timing, and triggering
settings are all contained in the DAQmx task.
The disadvantage of this approach in order for you to modify a channel, timing, or
triggering setting, you must make that change in the DAQmx task. Also, in order for
you to modify a channel, timing, or triggering setting, you must make that change in
the DAQmx task. You cannot make those changes directly from your VI with this
approach.
Full DAQmx API Approach
• Full flexibility
• Programmatically set configuration in VI
• Channel, timing, and triggering settings contained in VI
• No need to maintain a separate DAQmx task file
On the other hand, if you use the full DAQmx API you use DAQmx VIs on the block
diagram to configure channel, timing, and triggering settings. You no longer need a
separate DAQmx task object. Instead you can programmatically configure the
settings in the VI.
In this example, the user can configure settings such as the channel, measurement
range, sample rate, and number of samples to read, all from controls on the VI front
panel.
As you get more comfortable programming in LabVIEW and need more flexibility, you
should use the DAQmx API.
The DAQmx API programming flow starts with creating a DAQmx task, configuring
the task, starting the task, reading or writing data, and finally clearing the task.
To create the task, use the DAQmx Create Channel VI.
To configure the task, you can use the DAQmx Timing VI to set the sample rate and
use a DAQmx triggering VI to set up a trigger and use the DAQmx property node to
configure additional and advanced settings.
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-28 | ni.com
The DAQmx Start, Read/Write, and Clear VIs work the same as before.
```
Demonstration: DAQmx Task vs. Full DAQmx API
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-29
Exercise 5-3: DAQmx Task vs Full DAQmx API
```
(Optional)
```
Goal
Use and compare the DAQmx task with full DAQmx API approaches of acquiring data
from a DAQmx device.
Instructions
Approach 1: Using the DAQmx Task
This approach helps you get started quickly if you have already created a DAQmx task.
1. Open C:\Exercises\LabVIEW Core 1\DAQmx Task vs Full DAQmx API\DAQmx Task
vs Full DAQmx API.lvproj.
2. Examine the task presented in the project.
Open the My Analog Input Voltage task from the Project Explorer window.
```
Examine the settings in the DAQ Assistant dialog box. Notice Rate (Hz) is set
```
to 2.56 kHz.
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-30 | ni.com
```
Note Adjust Rate (Hz) to a rate that is supported by your DAQ device, if
```
necessary.
Click the Details button, and note that Physical Channel is set to PCI-6221/ai1.
Close the DAQ Assistant dialog box.
3. Open DAQmx Task Method VI from the Project Explorer window.
4. Tile the front panel and block diagram to see both at the same time by pressing
<Ctrl-T>.
5. Examine the block diagram.
Notice the task constant, which references the My Analog Input Voltage task
in the project. This task defines the channel and timing settings.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-31
Pay attention to the configuration of the DAQmx Read VI shown under the
Polymorphic VI selector.
6. Examine the behavior of this VI.
On the front panel, set the value of the Number of Samples control to 5120.
Note Because the sample rate defined in the My Analog Input Voltage task
```
is 2.56 kHz (samples per second) and Number of Samples is set to 5,120,
```
the DAQmx Read VI will read 5,120 samples representing 2 seconds of
data.
Run the VI.
Notice that this VI makes a single acquisition and stops. The data graph
```
indicator now shows 5,120 samples. Notice that the Time (s) x-axis shows
```
that graph contains 2 seconds of data.
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-32 | ni.com
Approach 2: Using the Full DAQmx API
This approach allows all the configuration settings to be contained in the VI and
provides more flexibility. This is the recommended approach for the remainder of this
course.
1. Create a copy of the DAQmx Task Method VI.
In the Project Explorer window, right-click the DAQmx Task Method VI and
select Save As.
In the appeared dialog box, select Open additional copy, check the Add copy
to DAQmx Task vs Full DAQmx API.lvproj box, and press Continue.
Name the VI as Full DAQmx API Method.vi, then click OK.
Close the DAQmx Task Method VI.
2. Delete the task in constant from the block diagram.
3. Programmatically create and configure the DAQmx task, as shown in the figure
below by following the instructions in the next steps.
4. Add a DAQmx Create Channel VI to the block diagram.
When you add the DAQmx Create Channel VI, select the configuration
settings as shown in the following figure.
On the block diagram, hover your cursor over the physical channels input.
Right-click and select Create Control.
Right-click both the minimum and maximum value inputs, and select Create
Control.
5. Add a DAQmx Timing VI to set the sample rate and sample mode.
When you add the DAQmx Timing VI, select the configuration settings as
shown in the following figure.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-33
Right-click the
rate
input and select
Create Control
. Rename it
```
Desired Sample Rate (Hz)
```
.
Right-click the
sample mode
input and select
Create Constant
. Set the value of the constant to
Finite Samples
because this VI will
only read a finite number of samples.Wire the
Number of Samples
control to the
samples per channel
input of the DAQmx Timing VI.
In finite acquisition mode, the
samples per channel
input tells the DAQmx task how many finite samples the DAQmx task should
acquire.
6.

Add a DAQmx Timing Property Node
to get the actual sample rate.
Note

If you can’t locate the appropriate Property Node setting follow the instructions below.
•
Right-click on the property node and click
Select Filter...
.
1
Timing
—Select and place the DAQmx Timing Property Node from the
Quick Drop
menu.
2
Sample Clock Rate
—In the pull-down menu, select
Sample Clock»Rate
.
3
```
Actual Sample Rate (Hz)
```
—Right-click the DAQmx Timing Property Node and select
Change All To Read
. Then right-click the
```
SampleClock:Rate
```
output and select
Create Indicator
. Rename the indicator as
```
Actual Sample Rate (Hz)
```
.
1
2
3
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-34 | ni.com
• The Configure Filter Settings dialog box should appear similar to the
following picture. Selecting Show All Attributes will cause LabVIEW to
display all properties regardless of which devices are configured on that
computer.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-35
7. Complete the wiring as shown in the figure under step 3.
8. Switch to the front panel and arrange the controls as shown in the following
figure.
9. Set the Number of Samples control to 5,120.
10. Set the values of the added controls to match the values in the DAQ Assistant
window.
11. You can find the values for DAQ Assistant in the locations shown in the following .
12. Run the VI.
Control Name DAQ Assistant Value Location
physical channels Configuration»Details»Physical Channel
```
Desired Sample Rate (Hz) Configuration»Timing Settings»Rate (Hz)
```
Note Enter this value into the control in units of Hz,
not kHz.
maximum value Configuration»Signal Input Range»Max
minimum value Configuration»Signal Input Range»Min
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-36 | ni.com
13. Because you are using the DAQmx Create Channel and DAQmx Timing VIs, you
can modify the physical channel and sample rate directly from your VI. This VI is
no longer directly connected to the My Analog Input Voltage task. All the
configuration for this DAQmx task is contained in this VI.
```
Change the Desired Sample Rate (Hz) control value from 2,560 to 5,120 to
```
update the sample rate.
```
Run the VI, and notice that the Time (s) x-axis now shows that only 1 second
```
of data was acquired.
```
Change the Desired Sample Rate (Hz) control value to 3,333. Run the VI, and
```
notice that the Actual Sample Rate indicator value is different from Desired
Sample Rate.
Note It is important for you to check the actual sample rate that the DAQ
device used to acquire your data. Do not assume that the actual sample rate
is the same as the desired sample rate you entered. The supported sample
rates vary depending on your DAQ device or module.
Change the physical channels control to a different channel, such as
PCI-6221/ai3.
Run the VI, and notice that you are now acquiring data from a different
channel.
14. Select File»Save.
15. Close the project when finished.
On the Job
If your application will use NI-DAQmx, which approach will you use? Circle the correct
answer.
a. DAQmx Task Approach
OR
b. Full DAQmx API Approach
End of Exercise 5-3
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-37
D. Building an Acquire-Analyze-Visualize VI
```
(Non-NI Instrument)
```
This section discusses how to build a VI that acquires, analyzes, and visualizes data
from a non-NI instrument.
Acquire Data
The typical instrument driver API programming flow is to initialize the instrument, then
configure the instrument, then initiate or start the instrument, then read or write
instrument data, and finally close the instrument.
Some instrument drivers require you to initiate the instrument and others do not.
When acquiring data from an instrument, you should start from an existing instrument
driver example VI, because the example VIs are intended to show you the
recommended way of programming that instrument.
This particular instrument driver example initializes the instrument, configures the
instrument settings, reads a single point of data from the instrument, closes the
instrument, and checks for errors.
Add Your Analyze and Visualize Code
After starting from an instrument driver example VI, you can then add your own
analyze code and visualize code.
1 Acquire 2 Analyze 3 Visualize
1 2 3
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 5-39
```
Activity: Lesson Review
```
1. Which Boolean mechanical action should you choose for the following control?
a. Latch when released
b. Switch when released
c. None of the above options are correct
2. What is the disadvantage of using the DAQmx task approach?
a. Makes the use of channel, timing, and triggering settings easier.
b. You must make that change in the DAQmx task when modifying a channel,
timing, and triggering setting.
c. Does not help you to get started.
3. Is the statement true or false?
The DAQmx API programming flow starts with creating a DAQmx task, configuring
the task, starting the task, reading or writing data, and finally clearing the task.
a. True
b. False
4. What kind of data type allows the user to input their username?
a. String
b. Boolean
c. Enumerated
d. Numeric
Copyright 2020 National Instruments
Lesson 5 Creating Your First Application
5-40 | ni.com
```
Activity: Lesson Review—Answers
```
1. Which Boolean mechanical action should you choose for the following control?
a. Latch when released
b. Switch when released
c. None of the above options are correct
2. What is the disadvantage of using the DAQmx task approach?
a. Makes the use of channel, timing, and triggering settings easier.
b. You must make that change in the DAQmx task when modifying a channel,
timing, and triggering setting.
c. Does not help you to get started.
3. Is the statement true or false?
The DAQmx API programming flow starts with creating a DAQmx task, configuring
the task, starting the task, reading or writing data, and finally clearing the task.
a. True
b. False
4. What kind of data type allows the user to input their username?
a. String
b. Boolean
c. Enumerated
d. Numeric
Copyright 2020 National Instruments
6
Debugging and
Troubleshooting
In this lesson, you learn about tools that help you debug
and troubleshoot a VI.
Topics
- Troubleshooting a Broken VI
- Debugging Techniques
- Manage and Display Errors
Exercises
Exercise 6-1 Debugging
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 6-3
A. Troubleshooting a Broken VI
This section discusses how to fix a broken VI.
If the Run button appears broken when you finish wiring the block diagram, the VI is
broken and cannot run.
You must fix these errors before you are able to run the VI.
When the Run button is not broken, it means you can run the VI.
Common Causes of Broken VIs
1 Broken Run Button
Example Cause
Broken wire due to
mismatch of data
types.
Control wired to
another control.
Required input of a
node is unwired.
1
Copyright 2020 National Instruments
Lesson 6 Debugging and Troubleshooting
6-4 | ni.com
Identify Problems and Fix Broken VIsTo find out why a VI is broken, you can view a list of errors by clicking the broken Run button. The Error list dialog box lists all the errors inthe VI and provides detailed information about the problem.Demonstration: Correcting a Broken VI
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 6-5
B. Debugging Techniques
In this section, we will walk through tools that will help you debug your code once
your VI is running.
Sometimes a VI is not broken and runs, but produces unexpected or incorrect data or
behavior. Then you need different debugging tools and techniques to identify and
correct the logic problems.
What to look for if a VI produces unexpected data or behavior:
• Are there any unwired or hidden subVIs?
• Is the default data correct?
• Does the VI pass undefined data?
• Are numeric representations correct?
• Are nodes executed in the correct order?
Execution Highlighting
Use the Highlight Execution button to view an animation showing the movement of
data on the block diagram from one node to another. This can help you get a better
idea of the order of execution in your VI. You can also see the data values being
passed along each wire.
If the VI runs more slowly than expected, confirm that you turned off execution
highlighting in subVIs.
1 Highlight Execution Button
1
Copyright 2020 National Instruments
Lesson 6 Debugging and Troubleshooting
6-6 | ni.com
Single-Stepping
You can use the single-stepping buttons to see how data moves through your block
diagram one node at a time. Each time you click a single-step button, only one node
on your block diagram will execute.
Probes
Another debugging tool is a probe. Use a probe to check values on a wire as a VI runs.
If you have a complicated block diagram with a series of operations and any one of
which might return incorrect data, you can use multiple probes to read the data values
passed along any wire to check if your code is working the way you expect.
1 Single-Stepping Buttons
1 Probes
2 Probe Watch Window
1
1
2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 6-7
Breakpoints
Breakpoints are a debugging tool that allow¬ you to pause execution at specific
locations you designate in your program.
When you reach a breakpoint during execution, the VI pauses and you can take the
following actions.
• Single-step through execution using the single-stepping buttons
• Probe wires to check intermediate values
• Change the values of front panel controls
• Click the Resume button to continue running to the next breakpoint or until the VI
finishes running.
```
Demonstration: Debugging Tools
```
Examine debugging tools used in Exercise 6-1.
Undefined or Unexpected Data
When you are debugging code, be aware that floating-point operations can return
symbolic values to indicate faulty computations or meaningless results. Symbolic
```
values include NaN (not a number), Infinity, and -Infinity.
```
1 Breakpoint
```
NaN (not a number) A floating-point value that
```
invalid operations produce,
such as taking the square
root of a negative number
Infinity A floating-point value that
valid operations produce,
such as dividing a number
by zero
1
Copyright 2020 National Instruments
Lesson 6 Debugging and Troubleshooting
6-8 | ni.com
Exercise 6-1: Debugging
Goal
Use debugging tools and troubleshooting techniques to fix a broken VI that returns
unexpected data.
Instructions
Edit-Time Errors
Locate and correct errors that prevent the VI from running.
1. Open and examine the Analyze Temperature VI.
Open the Debug.lvproj in the C:\Exercises\LabVIEW Core 1\Debug
directory.
```
Open the Analyze Temperature (broken Run button) VI from the Project
```
Explorer window.
Notice the Run button on the toolbar appears broken, indicating that the VI is
broken and cannot run.
2. Examine the block diagram of the Analyze Temperature VI, as shown in the
following figure.
This VI acquires a single temperature measurement, displays the temperature in
degrees Celsius, converts the temperature to degrees Fahrenheit, and determines
if the acquired temperature is within the specified range.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 6-9
3. Find and fix each error.
Click the broken Run button to display the Error list dialog box. Examine the
errors and warnings listed.
Double-click each error/warning to highlight the area on the block diagram that
contains the error.
Use the information in the Error list dialog box to fix each error.
Notice that after you fix all the errors, the Run button no longer appears
broken. You can now run the VI.
4. Save the VI.
1 Items with errors—Lists all LabVIEW items affected by errors and warnings in the
current VI. If two or more items have the same name, this list shows the specific
application instance for each ambiguous item.
2 Errors and warnings—Lists all errors and warnings associated with the VI, if a VI
is selected.
3 Details—Indicates specific details of the selected error or warning.
1
2
3
Copyright 2020 National Instruments
Lesson 6 Debugging and Troubleshooting
6-10 | ni.com
Run-Time Errors
Identify and correct errors that cause the VI to behave unexpectedly and return
incorrect responses.
When the results of your application are not what you expect, you can use a set of
tools to determine where errors occur within your code.
Although errors are often detected automatically, sometimes your code can run
successfully but not as intended. When this happens, you need to identify the source
of the unintended behaviors.
The following debugging tools can help you in this process:
• Execution highlighting
• Probes
• Breakpoints
• Single-stepping
1. Test the VI
```
From the Project Explorer window, open Analyze Temperature (incorrect
```
```
behavior) VI.
```
On the block diagram, set Thermocouple Channel to PCI-6221/ai1.
Switch to the front panel and run the VI.
The DAQmx Read VI returns the temperature in degrees Celsius to the
corresponding indicator.
Use a calculator to determine what the correct temperature in degrees
Fahrenheit should be:
```
Temperature (deg F) = Temperature (deg C) x 9/5 + 32
```
= ___________ x 9/5 + 32
= ___________
```
Does the Temperature (deg F) indicator value match your calculation? _______
```
Notice that even though the VI runs, the VI returns an incorrect result in the
```
Temperature (deg F) indicator.
```
Complete the following steps to identify the source of this error using the
debugging tools and correct the error.
2. Animate the flow of data through the block diagram.
Switch to the block diagram and click the Highlight Execution button to enable
execution highlighting and then run the VI.
Notice that you can see how data flows through the wires. At the output of
each node, you can see the data value displays momentarily.Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 6-11
3. Probe the wire values.
Add probes to the wires, as shown in the following figure, by right-clicking
each wire and selecting Probe.
The Probe Watch Window opens after you set a probe, which shows an item
for each probe you placed.
Run the VI.
Notice that the Probe Watch Window updates with the latest data values on
the corresponding wires. The row marked [1] data shows the data value for
the wire labeled with Probe 1.
Double-click any probe item in the Probe Watch Window to highlight the
corresponding probe on the block diagram.
You can view the latest data values of a probe by looking at the values in the
Probe Watch Window.
By examining these probes, you determine that Probe 1 shows the correct
temperature in degrees Celsius and Probe 4 shows an incorrect value for
temperature in degrees Fahrenheit. This means the mistake in this VI must
occur in the nodes between Probe 1 and 4.
Question 1 - What is the mistake?
Remove all the probes by right-clicking each probe in the Probe Watch Window
and selecting Remove.
Copyright 2020 National Instruments
Lesson 6 Debugging and Troubleshooting
6-12 | ni.com
4. Debug the VI using the single-stepping tool.
With execution highlighting, execution slows down, and the code executes until
completion. With single-stepping, you can execute a single node at a time, causing
the program to pause after the node completes.
Turn on Highlight Execution, and on the front panel toolbar, click the Step Over
button to start single-stepping through the VI. Execution highlighting shows
the flow of data on the block diagram from one node to another. When you
single-step through code, nodes are highlighted to indicate they are ready to
execute.
Click the Step Over button after each node to step through the entire block
diagram. Each time you click the Step Over button, the current node executes
and pauses at the next node.
When you step over the last node in the block diagram, it flashes to indicate
that all the nodes in the block diagram have finished executing. Click the Finish
```
VI “Analyze Temperature (incorrect behavior).vi” button to finish running the
```
VI.
5. Set a breakpoint to pause the VI when execution reaches a specified point in the
program.
When looking for a problem in your code, you may have an idea of the general area
where the problem exists. To help focus on this area, you can use a breakpoint to
pause the VI at a specified point in the program.
Imagine that you have determined that the problem in this VI occurs right after
the Add function executes.
Right-click the Add function and select Breakpoint»Set Breakpoint.
Notice that the Add function is highlighted red now and that the highlighted
```
function corresponds to a breakpoint item in the Breakpoint Manager
```
```
(Right-click on the highlighted function, then select Breakpoint»Breakpoint
```
```
Manager).
```
Turn off the Highlight Execution and run the VI.
Notice that the VI pauses when it reaches the breakpoint.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 6-13
Now that the VI has reached the area you want to examine, you can start
using your debugging tools. For example, you can turn on Highlight Execution
and click the Step Over button to start single-stepping through the VI.
When finished, remove the breakpoint by right-clicking the breakpoint on the
block diagram and selecting Breakpoint»Clear Breakpoint.
Note If you select Disable Breakpoint instead, the breakpoint will remain
on the block diagram but it will no longer pause execution. Then, you can
right-click and enable the breakpoint again later when you want the
breakpoint to start pausing execution again.
6. Save the VI.
Answers
Question 1 - Answer: The values obtained from those probes show that the
algorithm used to convert from ºC to ºF is incorrect.
End of Exercise 6-1
Copyright 2020 National Instruments
Lesson 6 Debugging and Troubleshooting
6-14 | ni.com
C. Manage and Display Errors
In this section, we will discuss managing and displaying errors.
Error Management
Many nodes include error inputs and outputs to allow for programmatic error handling.
Consider wiring these inputs and outputs to implement error handling in your code,
especially for I/O operations, such as file I/O, serial, instrumentation, data acquisition,
and communication.
As the code runs, each node tests for errors at execution. If no errors occur, the node
executes normally. If there are errors, the node that detects the error does not execute
and passes the error information to the next node. The next node does the same thing,
and so on. At the end of the execution flow, the last node returns error information to
the error out indicator.
Refer to the LabVIEW Help for more information.
Automatic Error Management
In this example, the VI tries to access a DAQmx channel, start a task, read data, and
clear the task, but the DAQmx channel does not exist.¬ How can you handle and report
this error?
By default, LabVIEW automatically handles any error when a VI runs by suspending
execution, highlighting the node where the error occurred, and displaying an error
dialog box.
In the error dialog box, each error has a numeric code to identify, and a corresponding
error message to display to the user.This is called automatic error management.
In this example, if the DAQmx Create Channel tries to create a task with a channel
that does not exist, that node will result in a run-time error.
Notice that automatic error management immediately suspends execution at any node
that has a run-time error, and launches error dialog box. This dialog box has two
options either to continue executing the VI¬ or stop the VI immediately.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 6-15
Programmatic Error Management
In most cases, instead of relying on automatic error management, you¬ should use
programmatic error management so that you can control how errors are passed and
reported. To use programmatic error management for a node, wire its error output to
the error input of the next node.
If a node executes without any error occurring, the node will pass no errors on its error
output wire.¬ However, if a node executes and has a run-time error, the node passes
that error to its error output wire.
As the code runs, each node tests for errors at execution. If no errors occur, the node
executes normally. If there are errors, the node that detects the error does not execute
and passes the error information to the next node. The next node does the same thing,
and so on. An exception to this is that shutdown nodes, like DAQmx Clear Task and
Close File will typically try to execute and shutdown resources even if they receive an
error on their error input.
At the end of your VI, you can connect the error wire to a Simple Error Handler VI,
which reports error details in a dialog box if an error has occurred.
By using programmatic error management we can manually control how and when to
report the error.
```
Demonstration: Automatic vs. Programmatic Error
```
Management
Error Cluster
An error wire is an error cluster data type, which consists of status, code, and source
items.
• Status is a Boolean value that reports TRUE if an error occurs.
• Code is a 32-bit signed integer that identifies an error numerically.
• Source is a string that identifies where the error occurred.
Copyright 2020 National Instruments
Lesson 6 Debugging and Troubleshooting
6-16 | ni.com
Errors and WarningsIf the error cluster data type has a status of TRUE, then it contains an error.If the error cluster data type has a status of FALSE, then it contains a warning.Error cluster has a value of No Error, if the status is FALSE, and the code is 0.It is possible to have an error with code 0. It is an archaic error that can be returned by GPIB.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 6-17
Display ErrorsMany nodes include error inputs and outputs to allow for programmatic error handling.If no errors occur, the node executes normally. If there are errors, the node that detects the error does not execute and passes the errorinformation to the next node. The next node does the same thing.At the end of the execution flow, you can place a Simple Error Handler VI, which will display a dialog containing error information if an errorhas occurred.
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 6-19
```
Activity: Lesson Review
```
1. Which of the following are the common causes of a broken Run button?
a. A required node input is unwired
b. Broken wire due to mismatch of data types
c. The block diagram includes a divide by zero
d. An indicator is wired to another indicator
2. If the status of an error cluster is TRUE, what does it indicate?
a. It contains a warning.
b. It contains an error.
c. It contains both an error and a warning.
d. It does not contain any error or warning.
3. Is the statement TRUE or FALSE?
In automatic error management, the program suspends the execution if an error
occurs.
a. True
b. False?
4. If an error occurs at the first node, how will this VI respond?
Copyright 2020 National Instruments
Lesson 6 Debugging and Troubleshooting
6-20 | ni.com
```
Activity: Lesson Review – Answers
```
1. Which of the following are the common causes of a broken Run button?
a. A required node input is unwired
b. Broken wire due to mismatch of data types
c. The block diagram includes a divide by zero
d. An indicator is wired to another indicator
2. If the status of an error cluster is TRUE, what does it indicate?
a. It contains a warning.
b. It contains an error.
c. It contains both an error and a warning.
d. It does not contain any error or warning.
3. Is the statement TRUE or FALSE?
In automatic error management, the program suspends the execution if an error
occurs.
a. True
b. False
4. If an error occurs at the first node, how will this VI respond?
```
Answer: Each node will pass the error information to the next node along the error
```
wires. The Simple Error Handler VI will display an error dialog box.
Copyright 2020 National Instruments
7
Executing Code
Repeatedly
Using Loops
In this lesson, you learn how to execute code repeatedly
using loops.
Topics
A. While Loops
B. For Loops
C. Timing a Loop
D. Using Loops with Hardware Application Programming Interfaces
```
(APIs)
```
E. Data Feedback in Loops
Exercises
Exercise 7-1 Introduction to While Loops
```
Exercise 7-2 Using Timing Functions and VIs in a Loop (Optional)
```
Exercise 7-3 Continuously Acquiring Data using DAQmx API Timing
Exercise 7-4 Using Shift Registers
```
Exercise 7-5 (Self-Study) Using Stacked Shift Registers
```
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-3
A. While Loops
In this section, we will learn how to execute code repeatedly using a While Loop.
A While Loop executes code until a condition has been met.
When a While Loop executes, it first executes the code inside the loop.¬Then it checks
whether the condition has been met.If the condition has not been met, the While Loop
repeats the code until the condition has been met.¬When the condition is met, the
While Loop exits.
If you’re familiar with text-based programming, a While Loop is similar to a do-while
loop or repeat-until loop.
The Iteration Terminal outputs the current loop iteration count. The first iteration
starts at 0.
The conditional terminal can be configured in one of two ways - either to stop the loop
if the Boolean value is True or to continue if the Boolean value is True.
Tunnels transfer data into and out of a loop. This While Loop has two tunnels, one
input tunnel and one output tunnel.
The While Loop will not begin executing until it receives data at all of its input tunnels.
The While Loop will not pass any data out of its output tunnels until the While Loop
has terminated.
1 Continue if the Boolean value is True.
2 Stop if the Boolean value is True.
1
2
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-4 | ni.com
You can wire an error wire to the Conditional Terminal to stop the While Loop.
If you wire an error wire to the Conditional Terminal or an Or function, only the TRUE
or FALSE value of the error status is passed.
In the following example, the While Loop stops when either the user clicks the Stop
button or the VI outputs an error.
```
Demonstration: While Loops
```
1 While Loop tunnels.
1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-5
Exercise 7-1: Introduction to While Loops
Goal
Use While Loop to execute code repeatedly and explain how its components
```
(iteration terminal and condition terminal) work.
```
Instructions
Explore the behavior of a VI without a While Loop
1. Explore the While Loop Basics VI.
Open C:\Exercises\LabVIEW Core 1\While Loop Introduction\While Loop
Introduction.lvproj.
From the Project Explorer window, open the While Loop Basics VI.
Press <Ctrl-T> to display both the front panel and the block diagram at the
same time.
2. Explore the front panel and block diagram.
Run the VI several times with different values in the Total Time in Seconds
```
control. (e.g. 10, 70, 3750).
```
Notice that each time you click the Run button, the VI calculates the hours,
minutes, and seconds and then stops. What if you wanted to click the Run
button once and have the VI continuously perform this calculation until the
user clicks a Stop button?
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-6 | ni.com
Execute Code Repeatedly
1. Place a While Loop around the code you want to execute repeatedly.
Select While Loop from the Programming»Structures menu in the Functions
palette.
Click and drag your mouse around the code performing the calculation and
refer to the following figure to complete the code.
1 Iteration terminal—Provides the current loop iteration count. The first iteration of
a loop is 0.
2 Current iteration indicator—Right-click the iteration terminal and select Create
Indicator. Rename the indicator Current Iteration.
3 Conditional terminal—Right-click the terminal and select Create Control to create
a Stop button. When a True value is passed to the conditional terminal, the While
Loop will exit.
1 2 3
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-7
2. Update the front panel.
Switch to the front panel.
Organize the front panel as shown in the following figure.
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-8 | ni.com
3. Increase the significant digits on the Current Iteration indicator so the iteration
number displays correctly.
Right-click the Current Iteration indicator and select Display Format.
On the Display Format tab, select Decimal under the Type section and press
OK.
4. Explore the functionality of the edited VI.
Run the VI.
Change the value of the Total Time in Seconds control. Notice that the VI
continuously runs the code in the While Loop, so the Hours, Minutes, and
Seconds indicators are continuously updated.
Notice that the Current Iteration indicator is incrementing.
Click the Stop button to stop the VI.
5. Explore the functionality of the VI further using execution highlighting.
Press Ctrl-T to display the front panel and the block diagram at the same time.
Turn on execution highlighting by clicking the Highlight Execution button.
Run the VI.Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-9
On the block diagram, notice that the Current Iteration indicator returns a 0 on
the first iteration and increases by 1 for each subsequent iteration.
Click the Stop button on the front panel. On the block diagram, notice that the
Stop control passes a True value to the conditional terminal, which causes the
While Loop to exit.
6. Click the Highlight Execution button again to disable execution highlighting. Save
the VI.
Explore the Functionality of While Loop Output Tunnels
1. Count the total number of iterations.
2. Update the front panel.
Arrange the front panel as shown in the following figure.
1 Numeric indicator—Add a numeric indicator to the front panel.
2 Increment function—This adds 1 to the value output of the iteration terminal to
display the correct number of iterations, because the first iteration of the While
Loop is 0. Rename the indicator Total Iterations.
3 Iteration output—Wire the output of the Iteration terminal through a tunnel on the
While Loop to the Increment function.
3 2
1
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-10 | ni.com
Select the Total Iterations indicator and configure the display format to
Decimal as you did with Current Iteration indicator.
3. Explore functionality of the While Loop output tunnel.
Run the VI.
Notice that the Total Iterations indicator is not updating.
Click the Stop button. Notice that the Total Iterations indicator now updates.
The While Loop does not execute until all of its inputs, which are input tunnels,
are available. A While Loop does not return anything through an output tunnel
until it finishes executing, when it finishes its last iteration due to an input to
the conditional terminal.
Click the Highlight Execution button and run the VI again.
Observe the flow of data on the block diagram at the output tunnel when you
click the Run button. Observe the flow of data when you click the Stop button.
4. Save the VI.
Explore the Functionality of While Loop Input Tunnels
1. Create an input tunnel.
Drag the Total Time in Seconds control out of the While Loop, so that your
block diagram looks like the following figure.
2. Explore the functionality of the While Loop input tunnel.
Press <Ctrl-T> to display the front panel and the block diagram at the same
time.
On the front panel, set the Total Time in Seconds control to 65.
Turn on execution highlighting, so you can watch the dataflow for this block
diagram.
Run the VI.
Notice that because of dataflow rules, the While Loop does not execute until
the input tunnel has received data.Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-11
Notice that for each iteration of the While Loop, the input tunnel returns a
value of 65.
If you change the value of the Total Time in Seconds control to 80 while the
While Loop is still running, what value do you think the input tunnel will return?
________
On the front panel, change the value of the Total Time in Seconds control to
80.
Notice that the input tunnel still returns a value of 65.
Because of the rules of dataflow, the While Loop must wait until all input
tunnels receive data before the While Loop can begin executing. When the
While Loop begins executing, the input tunnels will only return the original data
```
they received. The While Loop input tunnels only read data once (input tunnels
```
```
do not continuously read data).
```
3. Move the Total Time in Seconds control back into the While Loop, as shown in the
following figure, so that the While Loop reads the current value of the control
during every iteration.
4. Save the VI and project.
On the Job
In your applications, do you have code that you need to place in a While Loop?
______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
If so, describe the code or task that you need to execute repeatedly in a While Loop.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 7-1
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-12 | ni.com
B. For Loops
This section discusses how to repeatedly execute code a set number of times using a
For Loop.
The value in the N input terminal specifies how many times to repeat the code in the
For Loop.
The Iteration Terminal outputs the number of the current loop iteration. The first
iteration starts at 0.
```
Demonstration: For Loops
```
If necessary, you can add a Conditional Terminal to a For Loop by right-clicking the
For Loop and selecting the Conditional Terminal.
Notice a red dot appears in the corner of an N terminal, in the following figure, when
the Conditional Terminal is enabled.
A For Loop with a conditional terminal executes until the condition is met or until all
iterations are complete, whichever happens first.
1 Count Terminal
2 Iteration Terminal
1
2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-13
```
For Loop—Count Terminal Data Type (I32)The number of iterations a For Loop executes must be specified in non-negative integers.If you wire a floating-point numeric data type to the N terminal, LabVIEW converts the floating-point value to a signed 32-bit integer. Whenthis happens, red coercion dot appears on the N terminal, as shown in the following figure. A For Loop can only execute an integer numberof times. For example, a For Loop cannot execute 3.75 times.If you need to wire a floating-point numeric data type to the N terminal, you can make the conversion more explicit on the block diagram byusing the To Signed 32-bit Integer function, as shown in the following figure.
```
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-14 | ni.com
Activity 7-1: While Loops vs. For Loops
Goal
Determine when to use a While Loop and when to use a For Loop.
Description
For the following scenarios, decide whether to use a While Loop or a For Loop.
Scenario 1
Acquire pressure data in a loop that executes once per second for one minute.
1. If you use a While Loop, what is the condition that you need to stop the loop?
2. If you use a For Loop, how many iterations does the loop need to run?
3. Is it easier to implement a For Loop or a While Loop?
Scenario 2
Acquire pressure data until the pressure is greater than or equal to 1400 psi.
1. If you use a While Loop, what is the condition that you need to stop the loop?
2. If you use a For Loop, how many iterations does the loop need to run?
3. Is it easier to implement a For Loop or a While Loop?
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-15
Scenario 3
Acquire pressure and temperature data until both values are stable for two minutes.
1. If you use a While Loop, what is the condition that you need to stop the loop?
2. If you use a For Loop, how many iterations does the loop need to run?
3. Is it easier to implement a For Loop or a While Loop?
Scenario 4
Output a voltage ramp starting at zero, increasing incrementally by 0.5 V every
second, until the output voltage is equal to 5 V.
1. If you use a While Loop, what is the condition that you need to stop the loop?
2. If you use a For Loop, how many iterations does the loop need to run?
3. Is it easier to implement a For Loop or a While Loop?
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-16 | ni.com
Activity 7-1: While Loops vs. For Loops - Answers
Goal
Determine when to use a While Loop and when to use a For Loop.
Description
For the following scenarios, decide whether to use a While Loop or a For Loop.
Scenario 1
Acquire pressure data in a loop that executes once per second for one minute.
1. If you use a While Loop, what is the condition that you need to stop the loop?
While Loop: Time = 1 minute
2. If you use a For Loop, how many iterations does the loop need to run?
For Loop: 60 iterations
3. Is it easier to implement a For Loop or a While Loop?
Both are possible.
Scenario 2
Acquire pressure data until the pressure is greater than or equal to 1400 psi.
1. If you use a While Loop, what is the condition that you need to stop the loop?
While Loop: Pressure >= 1400 psi
2. If you use a For Loop, how many iterations does the loop need to run?
For Loop: unknown
3. Is it easier to implement a For Loop or a While Loop?
A While Loop. Although you can add a conditional terminal to a For Loop, you still
```
need to wire a value to the count (N) terminal. Without more information, you do
```
not know the appropriate value to wire to the count terminal.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-17
Scenario 3
Acquire pressure and temperature data until both values are stable for two minutes.
1. If you use a While Loop, what is the condition that you need to stop the loop?
```
While Loop: [(Last Temperature = Previous Temperature) for 2 minutes or more]
```
```
and [(Last Pressure = Previous Pressure) for 2 minutes or more]
```
2. If you use a For Loop, how many iterations does the loop need to run?
For Loop: unknown
3. Is it easier to implement a For Loop or a While Loop?
A While Loop. Although you can add a conditional terminal to a For Loop, you still
```
need to wire a value to the count (N) terminal. Without more information, you do
```
not know the appropriate value to wire to the count terminal.
Scenario 4
Output a voltage ramp starting at zero, increasing incrementally by 0.5 V every
second, until the output voltage is equal to 5 V.
1. If you use a While Loop, what is the condition that you need to stop the loop?
While Loop: Voltage = 5 V
2. If you use a For Loop, how many iterations does the loop need to run?
```
For Loop: 11 iterations (Including the two end points, count the iteration for each
```
```
value - 0, 0.5, 1.0, 1.5, ... 4.5, 5.0.)
```
3. Is it easier to implement a For Loop or a While Loop?
Both are possible.
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-18 | ni.com
C. Timing a Loop
In this section, we will discuss how to use timing in a loop.
Why do you need timing in a VI?
• To set the frequency of a loop
• To allow CPU to complete other tasks
• To determine how much time has elapsed while the loop is running
```
Concept: Wait functions Inside a Loop
```
There are two functions most commonly used to set the frequency of a loop:
```
• Wait (ms) function
```
• Wait Until Next ms Multiple function
These two functions have subtle differences in the way they apply the wait time, but
```
most of the time using the Wait (ms) function is sufficient.
```
In the example below the loop generates a random number every 100 ms.
```
Concept: Elapsed Time Express VI
```
When the Elapsed Time express VI executes, it returns how much time has elapsed
since the first time this Express VI was called or since the last time it was reset.
This Express VI also returns whether the target time, for example 10 seconds, has
elapsed yet.
The Elapsed Time express VI does not do any actual waiting. It only returns elapsed
time data when called.
```
Demonstration: Timing Functions and VIs
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-19
Exercise 7-2: Using Timing Functions and VIs in a
```
Loop (Optional)
```
Goal
Use timing functions and VIs in a loop to set the loop period, decrease CPU usage, and
view the current date/time and elapsed time.
Instructions
Set Loop Period
In this part of exercise, you set a specific loop period for your While Loop.
1. Explore the Set Loop Period VI.
Open C:\Exercises\LabVIEW Core 1\Using Timing Functions in
a Loop\Using Timing Functions in a Loop.lvproj.
From the Project Explorer window, open the Set Loop Period VI.
2. Run the VI.
Notice that the loop runs as fast as possible.
3. Modify the block diagram, as shown in the following figure, to set the loop to
execute every 1,000 ms.
Note You have configured this function to wait until the operating
```
system (OS) timer reaches a multiple of 1,000 before this function
```
completes execution. As a result, this loop executes one iteration every
1,000 milliseconds.
Note that in the first iteration, the Wait Until Next ms Multiple function will
probably wait less than 1,000 milliseconds. For example, if the OS timer is
at 5800 when the first iteration starts, then the Wait Until Next ms Multiple
```
function will only wait 200ms on the first iteration because the next multiple
```
1 Wait Until Next ms Multiple function—Right-click the millisecond multiple input
and select Create Constant. Set the constant to 1000.
1
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-20 | ni.com
of 1,000 is 6,000. However, the Wait Until Next ms Multiple function
should wait 1,000 ms on the subsequent iterations because the next
multiple will be 7,000, 8,000, 9,000, 10,000, and so on.
4. Observe the behavior of the VI.
Press <Ctrl-T> to display the block diagram and front panel at the same time.
Run the VI.
Notice that the While Loop executes one iteration every 1,000 milliseconds
after the first iteration completes.
Stop the VI.
On the block diagram, change the millisecond multiple input to 500.
Run the VI again and notice that the While Loop now executes one iteration
every 500 ms.
Stop the VI.
5. Experiment running the VI with different values in the Wait Until Next ms Multiple
constant.
Try to modify the VI, so that the While Loop executes one iteration every
2 seconds.
6. Save and close the VI when you are finished.
Allow the CPU to Complete Other Tasks
In this section, you want to ensure that your loop allows the CPU to complete other
tasks. In other words, you want to make sure that your VI does not needlessly have
a high CPU usage.
1. Explore the CPU Usage of a Loop VI.
From the Project Explorer window, open CPU Usage of Loop VI.
Examine the block diagram.
Notice that there is no Wait function in the loop, which means the loop will
run as fast as possible.
2. Observe the behavior of the VI.
Run the VI.
```
Change the values of the Slope (m), x, and Y-Intercept (b) controls. Notice that
```
the y indicator continuously updates because the While Loop continuously
performs the calculation.
3. Examine the CPU usage.
Launch the Windows Task Manager.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-21
In Process tab, observe the CPU usage of LabVIEW.exe. Because the While
Loop is running as fast as possible, LabVIEW will have a high CPU usage.
CPU Usage of LabVIEW.exe: ________________
```
Note (Windows 10) Right-click the Windows taskbar and select Task
```
Manager.
4. Stop the VI when finished.
5. Modify the block diagram, as shown in the following figure, to add a Wait (ms)
```
function to lower the CPU usage of this VI.
```
Note Adding even a small amount of time to wait will decrease the CPU
usage significantly.
6. Run the VI.
7. In the Windows Task Manager, notice that the CPU usage of LabVIEW.exe is now
much lower.
8. Stop the VI.
9. Save and close the VI when finished.
View Current Date/Time and Elapsed Time
In this section, you explore the functions that return the current date/time and elapsed
time.
1. From the Project Explorer window, open Using Timestamp and Elapsed Time
Functions VI and examine the block diagram.
Notice that the While Loop continuously performs a slope calculation.
The Get Date/Time in Seconds function returns the current date and time. This
```
function does not wait.
```
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-22 | ni.com
The Elapsed Time Express VI returns how much time has elapsed since the
first time the function executed in the loop. This VI does not wait.
When the elapsed time is greater than or equal to the target time, then the
Elapsed Time Express VI will return True from the Target Time Has Elapsed
terminal. Since this output is wired to the conditional terminal of the While
Loop, the While Loop will exit after the target time has elapsed.
```
Use the Context Help window (press <Ctrl-H>) to find more information on
```
how the Get Current Time function and Elapsed Time VI work.
Question 1 - Because none of the functions or VIs in this While Loop wait, how
many iterations per second does this While Loop execute?
2. Examine the behavior of the Using Timestamp and Elapsed Time Functions VI.
```
On the front panel, set the Target Time (s) control to 15.
```
```
Run the VI and notice that the Elapsed Time (s) indicator continuously displays
```
how much time has elapsed since the While Loop started.
Notice that the Current Time indicator continuously displays the current date
and time.
Notice that the While Loop is executing its iterations as fast as possible.
Notice that the While Loop exits after 15 seconds has elapsed.
In the Windows Task Manager, observe the high CPU usage of the
LabVIEW.exe process while this VI is running and record the value.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
3. Reduce the CPU usage of this VI.
This VI does not have to run the While Loop iterations as fast as possible.
How can you modify this VI to reduce the CPU usage?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
Use your ideas to modify the VI to reduce the CPU usage.
Did your modification work? What is the CPU usage of the LabVIEW.exe
process now?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
See the next page for the solution.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-23
Answer
To reduce the CPU usage of the Using Timestamp and Elapsed Time Functions VI, you
```
can add a Wait (ms) function inside the While Loop, as shown in the following figure.
```
Even adding a small amount of time to wait will decrease the CPU usage significantly.
Answers
Question 1 - Answer: The While Loop executes its iterations as fast as possible
because the While Loop does not contain a function or a VI that waits.
End of Exercise 7-2
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-24 | ni.com
D. Using Loops with Hardware Application Programming Interfaces (APIs)In this section, we will discuss how to use loops with hardware APIs to continuously acquire data from hardware.DAQmx API Programming Flow with LoopWhen using the DAQmx API to continuously read or write data, you should create, configure, and start the task first. Then you shouldcontinuously read or write data in a loop. After the loop exits, then clear the task.In the following example, the VI does the following:1.

Create a task using the DAQmx Create Channel VI.
2.

Configure the task by using the DAQmx Timing VI set to the Continuous Samples sample mode and setting the Sample Rate and Numberof Samples.
3.

Start the task using the DAQmx Start VI.
4.

In the While Loop, the DAQmx Read continuously reads multiple samples until the user clicks the stop button.
5.

After the While Loop exits, the DAQmx Clear shuts down the task and the VI checks for errors.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-25
```
Concept: DAQ Continuous Acquisition
```
As background, let’s talk about how the acquired data gets to your VI.
First, the DAQ device acquires samples of the signal at the specified sample rate, for
example 10 Hz, and stores these samples in the buffer on the DAQ device hardware.
Then, these samples get automatically transferred to a buffer on the PC.
Then, when your VI calls the DAQmx Read, this VI pulls the specified number of
samples out of the PC buffer.
DAQmx Read VI Wait Behavior
The DAQmx Read VI waits until the requested amount of data is available from the PC
buffer. In this example, the DAQmx Read waits until 1000 samples are available to
read in the PC buffer.
This built-in wait allows the CPU to perform other tasks while the DAQmx Read is
waiting for samples to become available.
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-26 | ni.com
Exercise 7-3: Continuously Acquiring Data using
DAQmx API Timing
Goal
Create a VI that continuously acquires data from a DAQmx device.
Predict the time to wait before reading data from the DAQmx device and the While
Loop frequency based on the sample rate and number of samples you specify.
Instructions
Examine the Finite Acquisition VI
1. Explore the Finite Acquisition VI.
Open C:\Exercises\LabVIEW Core 1\While Loop with Hardware API\
While Loop with Hardware Timing.lvproj.
Open the Finite Acquisition VI from the Project Explorer window.
Notice the controls and waveform graph indicator on the front panel.
Switch to the block diagram and notice that the code performs a finite
acquisition.
Examine the configuration of the following three VIs.
2. Examine the functionality of the Finite Acquisition VI.
On the front panel, specify the following values to the controls:
– Physical Channel: PCI-6221/ai1
```
– Desired Sample Rate (Hz): 1,000
```
– Number of Samples: 1,000
1 DAQmx Create Channel VI—Note the Polymorphic VI selector configuration.
2 DAQmx Timing VI—This VI sets the sample rate of the acquisition. The sample
mode must be set to Finite Samples for a finite acquisition.
3 DAQmx Read VI—This VI reads data from the DAQ device. Notice that the VI is
configured to read multiple samples from single channel. As a result, the DAQmx
Read VI has a number of samples per channel input, which tells this VI to wait
until n samples of acquisition data is available to read from the DAQ device.
1 2 3
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-27
Run the VI and notice that this VI performs a single acquisition and is finished.
The DAQmx Read VI waits until 1,000 samples of data is available to read
from the DAQ device. Then the DAQmx Read VI returns 1,000 samples of
data to the waveform graph indicator.
Set the Number of Samples control to 5,000, and run the VI again.
Notice that the DAQmx Read VI must now wait until 5,000 samples of data
is available to read from the DAQ device.
```
Note When the sample rate is 1,000 Hz (1,000 samples per second),
```
5,000 samples of data represents 5 seconds of data.
3. Close the VI when you are finished.
Creating a VI to Acquire Data Continuously
1. Create a copy of the Finite Acquisition VI.
In the Project Explorer window, right-click the Finite Acquisition VI and select
File»Save As.
In the appeared dialog box, select the Open additional copy option and place
a checkmark in the Add copy to While Loop with Hardware Timing.lvproj
checkbox, then press Continue.
Name the VI as Continuous Acquisition, click OK.
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-28 | ni.com
2.

Modify this VI, as shown in the following figure, to acquire data continuously until the user clicks the
Stop
button.
1
sample mode
constant—Set this constant to Continuous Samples so you can continuously read acquisition data in the While Loop.
2
While Loop
—Add the While Loop around the DAQmx Read VI. Because the
Number of Samples
control is outside the While Loop, the
DAQmx Read VI will only see the first value of the
Number of Samples
control when the VI begins running. This is the desired behavior
for this VI because we intend for the user to set all control values before running the VI and not modify values after the VI begins running.
3
Stop
control—Right-click the condition?? terminal and select
Create Control.
4
OR
function—Add an OR function between the
Stop
control and conditional terminal and wire the error wire to input x. This stops the
While Loop when the user clicks the
Stop
button or when an error occurs.
3
4
1
2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-29
3. Examine how the Desired Sample Rate (Hz) and Number of Samples values affect
how long the DAQmx Read VI waits and how often the waveform graph indicator
updates.
On the front panel, specify the following values to the controls:
– Physical Channel: PCI-6221/ai1
```
– Desired Sample Rate (Hz): 1,000
```
– Number of Samples: 1,000
Run the VI.
Notice that the VI now continuously acquires and displays data until you click
the Stop button.
Notice that the waveform data graph updates about once per second.
This is because the DAQmx Read VI is configured to read by samples. At a
sample rate of 1,000 Hz, the DAQ device acquires 1000 samples per second.
Therefore, for each iteration of the While Loop, the DAQmx Read VI must wait
approximately 1 second for 1,000 samples to be available to read and then
returns that data.
Launch the Windows Task Manager and go to the Performance tab. Notice
that the CPU is not at 100% because the DAQmx Read VI waits, which allows
the CPU to execute other tasks.
```
Note (Windows 10) Right-click the Windows taskbar and select Task
```
Manager to launch the Task Manager.
Click the Stop button to stop the VI.
4. Try to predict what will happen in the following scenarios.
Sample Rate: 1,000
Number of Samples: 500
How often will the wavefrom graph on the front panel update? ___________
Sample Rate: 1,000
Number of Samples: 2,000
How often will the waveform graph on the front panel update? ___________
5. Test the combinations of different sample rate and number of samples. Record the
results, and compare the results with your predictions in the previous step. You
must stop the VI between each test because the Number of Samples control is
outside the While Loop.
Sample rate: 1,000
Number of Samples: 500
How often did the waveform graph on the front panel update? ___________
Sample rate: 1,000
Number of Samples: 2,,000
How often did the waveform graph on the front panel update? ___________
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-30 | ni.com
Note At a sample rate of 1,000 Hz, the DAQ device acquires
1,000 samples per second. Therefore, the DAQmx Read VI must wait
approximately 0.5 seconds for 500 samples and 2 seconds for 2,000
samples.
6. Save the VI and close the project.
End of Exercise 7-3
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-31
E. Data Feedback in Loops
In this section, we will learn how to use a shift register to access values from a
previous loop iteration.
Introduction to Shift Registers
Shift registers transfer values from one loop iteration to the next.
Sometimes when you program with loops, you need to access and use data acquired
in a previous loop iteration. For example, if you need to get the average of several
temperature readings, you would need to use the value from several previous loop
iterations. LabVIEW uses shift registers to store and transfer any type of data, such
as numeric, Boolean, or string.
Shift Registers appear as a pair of terminals directly across from each other on the
vertical sides of the loop border.
Initializing Shift Registers
Let’s take a look at an example of using shift registers with a For Loop.
The For Loop shown in the first row of the table is configured to run two times, and
add two to the value passed from the shift register each time. Because the left shift
register is not initialized, it has a value of zero before the VI runs the first time. During
the first iteration, the VI adds zero and two.The value of two is passed to the shift
register and used during the second iteration of the loop, this time adding two plus
two. After the VI completes, the value of the output indicator is four.
1 Shift Registers
1
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-32 | ni.com
Because the shift register is not initialized, when you run the VI a second time, the
right shift register holds onto the value of the last iteration, four in this case, and
passes it back to the left shift register. So the second time the VI runs its two loop
iterations, the value of the Output indicator is 8.
The default value of an uninitialized shift register for a numeric is zero. For a string,
the default is Empty, and for a Boolean, the default is False.
If you want the loop to start with the same value each time the VI runs, you can
initialize the shift register with a control or constant to reset¬ ¬the value for the first
iteration of the loop.
Here, in the second loop the shift register is initialized to start with a value of one when
the loop runs the first time. This means that when the VI completes, the value
displayed in the output indicator is five.
Multiple Shift Registers
A loop can contain more than one shift register. If you have multiple operations that
use previous values within a loop, you can use multiple shift registers to store the data
values from those different operations.
Notice that the shift register pairs are directly across from each other on the edges of
the loop.¬
The value of a shift register is stored and passed to its paired terminal directly opposite
of it.
Here, we are keeping the value of the add operation and the multiply operation. The
first iteration of the loop stores a value of two in each shift register, and then forwards
those to be used in the next iteration.
Multiple Previous Iterations
A loop can also contain what are called stacked shift registers, which retain values
from multiple previous iterations.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-33
The most recent iteration value is stored in the top shift register, and as the loop
continues to run, the value from the previous iteration is passed down the stack as
new values are added.
```
Multimedia: Using Shift Registers
```
When you create a shift register, the shift register reflects the data type you wire to
the terminals. If you do not initialize the register, the loop uses the value written to
the register when the loop last executed, or it uses the default value for the data type
if the loop has never executed. You can add more than one shift register to a loop for
applications such as averaging data points.
Complete the multimedia module,Using Shift Registers, available in the
```
C:\Exercises\LabVIEW Core 1\Multimedia folder.
```
Real-World Shift Register Examples
Keep Track of Minimum/Maximum Values From All Loop Iterations
In this real-world example, we use a shift register to keep track of the maximum value
acquired from all loop iterations.
First, we initialize our shift register to negative infinity.
On the first iteration of the loop, this VI acquires a temperature, and then we use the
Max and Min function to compare its two inputs and return the larger value. The first
acquired temperature will always be greater than negative infinity, so the Max and Min
```
function will output the first acquired temperature and store it in the shift register. We
```
are using the shift register to store the current maximum value.
On the second iteration of the loop, this VI acquires another temperature, and we use
the Max and Min function to compare the acquired temperature to the current
maximum value stored in the shift register.
If the acquired temperature is less than the current maximum, then the current
maximum gets stored back into the shift register.
If the acquired temperature is greater than the current maximum, then the acquired
temperature gets stored into the shift register as the new maximum.Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-34 | ni.com
Output TRUE if a Boolean Value Was TRUE in Any Iteration
In this real-world example, we use a shift register to store whether a Boolean value
was TRUE in any loop iteration.
In this loop, we want the threshold ever exceeded indicator to output TRUE if the
threshold has ever been exceeded in the current loop iteration or any previous loop
iterations.
First, we initialize our shift register to FALSE.
In each loop iteration, we check if the threshold has been exceeded. If the threshold
has not been exceeded, the Or function will continue to output FALSE and store a
FALSE in the shift register.
However, if the threshold has been exceeded, the Or function will output TRUE and
store a TRUE in the shift register. Once the shift register contains a TRUE, the shift
register will continue to output TRUE because of the Or logic.
Therefore, the shift register keeps track of whether a Boolean value was TRUE in any
loop iteration.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-35
Exercise 7-4: Using Shift Registers
Goal
Use a shift register to pass values from previous iterations through a While Loop to
the next iteration. This way, you can keep track of the maximum acquired value.
Instructions
1. Open C:\Exercises\LabVIEW Core 1\Using Shift Registers\
Using Shift Register.lvproj.
2. From the Project Explorer window, open Track the Maximum Temperature VI.
3. Explore and run the VI.
On the block diagram, modify the minimum value, maximum value, and
thermocouple type constant values to match your hardware.
On the front panel, set the Thermocouple Channel control accordingly.
Run the VI.
Notice that this VI performs a continuous acquisition at a rate of 10 Hz. The
DAQmx Read VI reads one temperature value per loop iteration.
Click the Stop button on the front panel when finished.
4. Add a shift register to the While Loop. This shift register will store the value of the
maximum acquired value.
Right-click the border of the While Loop and select Add Shift Register.
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-36 | ni.com
5.

Modify the block diagram, as shown in the following figure.
6.

Test the VI, and observe the shift register logic.
Turn on execution highlighting by clicking the
Highlight Execution
button.
Run the VI. Touch the thermocouple to make the temperature increase and decrease, and observe how the logic of the shift register,Max & Min function, and DAQmx Read VI work together to keep track of the maximum temperature acquired.The
Max Temperature Acquired
indicator should show the maximum temperature acquired over all While Loop iterations.
Click the
Highlight Execution
button again to disable execution highlighting. The VI runs at regular speed.
1
Negative Infinity
constant—Wire this constant to initialize the shift register. This ensures that the DAQmx Read VI output in the first
```
iteration will become the new maximum value stored in the shift register (because any number is greater than negative infinity).
```
2
Max & Min
function—Use this function to compare the maximum acquired value with the current value and return the higher value of
the two.
3
Max Temperature Acquired
indicator—Right-click the
```
max(x,y)
```
output of the
Max & Min
```
function and select
```
Create Indicator
. Rename
the indicator as
```
Max Temperature Acquired (deg C)
```
.
1
2
3
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-37
Your Turn
1. From the Project Explorer window, open the Threshold Exceeded VI.
2. Run and explore the VI. The Threshold Currently Exceeded? indicator turns on if
the DAQmx Read VI output exceeds the Max Threshold control value.
3. Add a Boolean indicator named Threshold Ever Exceeded? to the front panel.
4. Modify the VI so that the Threshold Ever Exceeded? indicator turns on and stays
on if the DAQmx Read VI output ever exceeds the Max Threshold control value.
```
(Hint: Use a shift register that stores the data if the max threshold has ever been
```
```
exceeded).
```
```
Answer:
```
You can compare your answer with the solution in C:\Solutions\LabVIEW Core 1\
Exercise 7-4 directory.
On the Job
```
In your own application(s), do you have a need to use a shift register to keep track of
```
a value in the previous iteration?
End of Exercise 7-4
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-38 | ni.com
```
Exercise 7-5: (Self-Study) Using Stacked Shift
```
Registers
Goal
Use a stacked shift register to store and access values from multiple previous
iterations.
Instructions
1. Open C:\Exercises\LabVIEW Core 1\Stacked Shift Registers\
Using Stacked Shift Registers.lvproj.
2. From the Project Explorer window, open Running Average Using Stacked Shift
Register VI.
3. Explore the stacked shift register on the block diagram.
Notice the stacked shift register.
```
The first (top) left shift register returns data from the previous iteration.
```
The second left shift register returns data from the second-most recent
iteration. If there was a third left shift register, it would return data from the
third most recent iteration.
4. Examine the functionality of the block diagram.
The purpose of the stacked shift register in this VI is to help calculate the
average of the three most-recent temperature measurements. The DAQmx
```
Read VI in the While Loop returns the current measurement, the first (top) left
```
shift register returns the previous measurement, and the second left shift
register returns the measurement before the previous measurement.
The Average Temperature Chart indicator displays the running average of the
three most recent temperature measurements.
Notice that this VI reads one temperature measurement before the While Loop
and uses this initial temperature measurement to initialize each stacked shift
register.
5. Test the VI.
Run the VI.
Compare the Average Temperature Chart and the Temperature Chart
indicators. The Average Temperature Chart indicator should be smoother due
to the averaging.
Turn on execution highlighting by clicking the Highlight Execution button to
examine how the stacked shift register stores and returns data.
Click the Stop button to stop the VI when finished.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-39
6. Resize the stacked shift register to access data from even earlier loop iterations.
Hover your mouse cursor over the bottom border of the last left shift register.
When the mouse cursor changes to the resize cursor, drag the shift register
downwards to add more elements shift register to access data from even
earlier loop iterations.
Alternatively, you can right-click the stacked shift register and select
Add Element.
Your Turn
Modify the VI so that the Average Temperature Chart indicator displays the average
of the five most recent temperature measurements.
To view the answer, open the project in C:\Solutions\LabVIEW Core 1\
```
Exercise 7-5 (Your Turn).
```
End of Exercise 7-5
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 7-41
```
Activity: Lesson Review
```
1. Which structure must run at least one time?
a. For Loop
b. While Loop
2. When does the value of the counter indicator update?
a. Before the Loop runs
b. While the Loop is running
c. After the Loop finishes executing
d. All of the above
3. How often does this While Loop update the data indicator?
a. Every 0.25 seconds
b. Every 0.5 seconds
c. Every 1 second
d. Every 2 seconds
Copyright 2020 National Instruments
Lesson 7 Executing Code Repeatedly Using Loops
7-42 | ni.com
```
Activity: Lesson Review – Answers
```
1. Which structure must run at least one time?
a. For Loop
b. While Loop
2. When does the value of the MyNumeric indicator update?
a. Before the Loop runs
b. While the Loop is running
c. After the Loop finishes executing
d. All of the above
3. How often does this While Loop update the Data indicator?
a. Every 0.25 seconds
b. Every 0.5 seconds
c. Every 1 second
d. Every 2 seconds
Copyright 2020 National Instruments
8
Working with
Groups of Data
In this lesson, you learn how to work with array and
waveform data types and how to work with single-channel
andN-channel acquisition data.
Topics
- Groups of Data in LabVIEW
- Working with Single-Channel Acquisition Data
- Working with N-Channel Acquisition Data
- Using Arrays
Exercises
Exercise 8-1 Creating and Viewing an Array
Exercise 8-2 Examining the Waveform Data Type
Exercise 8-3 Using Analysis Functions and VIs to Analyze Data
Exercise 8-4 Visualizing N-Channel Data
Exercise 8-5 Extracting a Subset of an N-Channel Data Array
```
(Optional)
```
Exercise 8-6 Exploring Auto-Indexing Tunnels
Exercise 8-7 Processing Data For Each Channel in an N-Channel Data
Array
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-3
A. Groups of Data in LabVIEW
This section discusses the array data type and waveform data type.
Array Data Type
The array data type is a collection of data elements of the same data type. For
example, the following figure shows three different arrays - a numeric array, a Boolean
array, and a string array.
Note Array indexes in LabVIEW are zero-based. The index of the first element in
the array, regardless of its dimension, is zero.
Each item in the array is called an array element.
This example array consists of 10 array elements.
Each array element has a corresponding index number that specifies the array
element’s location within the array.
The first array element has an index of 0. The second array element has an index of
1. The third array element has an index of 2, and so on.
Array Collection of data elements that are of the same type.
Elements The data that make up the array. Elements can be numeric, Boolean, path, string,
waveform, and cluster data types.
Dimension Length, height, or depth of the array. Arrays can have one or more dimensions and
```
as many as (231 )-1 dimensions.
```
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-4 | ni.com
The array element at index 6 has a value of 27, and the array element at index 9 has
a value of 30.
1D Array vs 2D Array
Arrays can have one or more dimensions, for example length, height, or depth.
The top side of the figure shows a one-dimensional array, which extends in only one
direction.
The bottom side of the figure shows a two-dimensional array, which extends in two
directions, so we have rows and columns.
The 2D array shows its array elements in a grid of rows and columns.
A 2D array has both a row index and a column index, ¬which both start at 0.
You can specify a specific array element using the row index and column index. For
example, the highlighted array element is at row index 0, column index 6.¬
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-5
You can also specify an entire row using the row index.¬
In the same way, you can specify an entire column by specifying the column¬index.
Viewing Array Data
You can view numeric array data as an array indicator or as a graph.
The following two indicators show the same data. The array indicator lists the data
points, while the graph indicator shows that same array data as a plot.
Notice that the y-axis represents the array values and the x-axis represents the array
index.
Each point represents one array element, and the plot connects the points with lines.
The following figure shows an example of how a 2D array is visualized by an array
indicator and a graph.¬
The graph interprets each row of the 2D array as a separate plot.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-6 | ni.com
Initializing Arrays
An empty array has a defined number of dimensions and defined data type but
contains no data in its elements.¬The empty array in this example has two dimensions
and has a numeric data type, but it contains no actual data.
An initialized array has a defined number of dimensions and data type and also
contains data in its elements. The initialized array in this example has two dimensions,
with two rows and three columns of defined numeric data.
```
Demonstration: Creating and Viewing Arrays
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-7
Exercise 8-1: Creating and Viewing an Array
Goal
Create and view a numeric array.
Instructions
1. Create a new project. Save the project as Create Array.lvproj in the
```
C:\Exercises\LabVIEW Core 1\Create Array directory.
```
2. Create and open a new VI. Rename the VI as Create Array.vi.
3. Create an array of numeric controls.
Add an Array shell to the front panel. Rename it as My Numeric Array.
Add a numeric control inside the unconfigured array.
4. Resize the array to show 6 elements.
Select the entire array control so that a blue line outlines the array, as shown
below.
To resize the array horizontally, drag the dot on the far right until 6 elements
appear on the front panel.
Notice that the six elements appear grayed out. This is because these
elements are uninitialized and contain no actual data.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-8 | ni.com
5. Enter data into the array control. Enter 5, 10, 15, 20, 25 into the array, as shown
below. Notice that in this example, the last element is still grayed out and
uninitialized.
Question 1 - Check your understanding of the array index.
What is the value of the array element at index 2? _____
What is the value of the array element at index 4? _____
What is the value of the array element at index 0? _____
Remember, arrays are zero-indexed, which means the very first element of the
array is at index 0.
6. Examine the array index display.
If you set the index display to 2, then the leftmost element in the array will show
the element at index 2, and the element to its right will show the element at
index 3.
Increase and decrease the index display to examine how it affects which
elements are shown in the array control.
7. View how the array data appears on a graph indicator.
Place a waveform graph indicator on the front panel.
Create the block diagram, as shown in the following figure, to pass the array
data to the graph.
Switch to the front panel and run the VI. Notice how the 1D array data is
visualized in the waveform graph indicator.
1 Index display—Controls which array element is shown at the leftmost element.
Use the increment and decrement buttons to change the value in the index
display.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-9
Right-click the waveform graph indicator and select Properties to open the
Graph Properties dialog box. In the Plots tab you can configure the visual
representation of the plot. For now, configure plot as shown in the picture
below for the indicator to display sequentially connected points, which
represent the data values in the array control.
– On the y-axis of the waveform graph, double-click Amplitude and rename
it as Data Value.
– On the x-axis of the waveform graph, double-click Time and rename it as
Index.
Notice that the My Numeric Array control contains data values, but does
not contain any timing information. Therefore, the x-axis only represents
the array index number for each array data value. This is why you see
points at x-axis values of 0, 1, 2, 3, and 4.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-10 | ni.com
```
Creating a Two-Dimensional (2D) Array
```
1. Change the number of dimensions from 1 to 2.
Right-click index display of My Numeric Array and select Add Dimension.
2. View two dimensions (rows and columns) of data.
Select the entire array control so that a blue line outlines the array.
Drag the middle-bottom dot downwards until 4 rows are displayed on the front
panel.
3. Enter data into the 2D array, as shown in the following figure.
4. Examine the index display.
Notice that there are now two numeric controls in the index display.
The top numeric control refers to the row index. The bottom numeric control
refers to the column index.
Increase and decrease the index display controls to examine how it affects
which elements are shown in the array control.
Question 2 - What is the row index and column index of the element
containing 12?
Row Index
Column Index
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-11
5. View how the 2D array data appears on a graph indicator.
Switch to the front panel and run the VI. Observe how the 2D array data is
visualized in the waveform graph indicator.
Hover your cursor over the plot legend, and resize it to show three plots.
Right-click the Waveform Graph indicator and select Properties. Configure
each plot as the first one in the Plots tab of the Properties dialog box. The
Waveform Graph indicator now displays points that represent the data values
in the array control. The lines connect the points sequentially.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-12 | ni.com
Configure the Appearance of an Array Control
1. Right-click the body of My Numeric Array control.
2. In the Visible Items section of the drop down menu, you can configure whether to
show the label, caption, index display, horizontal scrollbar, and vertical scrollbar.
Check and uncheck these items to observe their effect on the appearance of
the My Numeric Array control.
Answers
Question 1 - Answers: 15, 25, 5
```
Question 2 - Answer: row index is 1; column index is 3
```
End of Exercise 8-1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-13
Waveform Data Type
The waveform data type is made up of 3 items:
```
• Start time (t0) - Specifies the start time of the waveform.
```
```
• Time interval between data points (dt) - Specifies the time interval in seconds
```
between data points in the waveform.
```
• Data values (Y numeric array) - Specifies the data values of the waveform.
```
You can visualize the waveform data type using a waveform indicator or graph.
The Y array data values represent the data values of each point.
The t0 start time item and dt interval time item in the waveform data type provide
timing information.¬Because of this, the x-axis for a graph with a waveform data type
is in units of time.
The dt, or interval time, specifies the time interval in seconds between data points in
the waveform.
If you need to extract the individual Y array, t0, or dt waveform items, then use the
Get Waveform Components function to access the specific item.
```
Demonstration: Examining the Waveform Data TypeCopyright 2020 National Instruments
```
Lesson 8 Working with Groups of Data
8-14 | ni.com
Exercise 8-2: Examining the Waveform Data Type
Goal
Recognize the components and visualization of the waveform data type.
Instructions
1. Open C:\Exercises\LabVIEW Core 1\Waveform Data Type\
Waveform Data Type.lvproj.
2. Open the Examine Waveform Data Type VI from the Project Explorer window.
3. Examine the VI.
Examine the front panel, which consists of a waveform control and waveform
chart indicator.
Examine the block diagram. Notice that the waveform control passes its data
directly to the chart indicator.
Examine the waveform control, which has a waveform data type. Take notes
of the following information contained in the waveform data type.
Based on the number of data values and the interval time, what do you think
is the total duration, in seconds, of this waveform?
```
Initial Time (t0)
```
```
Interval Time (dt)
```
```
Data Values (Y)
```
Index 0
Index 1
Index 2
Index 3
Index 4
Index 5
Index 6
Index 7
Index 8
Index 9
Index 10
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-15
4. Run the VI.
The waveform data type contains both data values and timing information.
```
The x-axis of the waveform chart indicator is in units of Time (seconds).
```
5. Modify the interval time (dt).
Change the interval time from 0.1 seconds to 0.2 seconds.
What effect do you think this change will have on the waveform chart
indicator?
Run the VI.
Notice that the data values have remained the same. However, the amount of
time between each point on the chart is now 0.2 seconds, and the total
duration of the waveform on the chart has increased to 2 seconds.
6. Modify the initial time (t0).
Currently the x-axis of the waveform chart indicator shows relative time in units
of seconds, where the initial time is always displayed as 0.
```
View the initial time (t0) in units of absolute date/time on the chart indicator.
```
– Right-click the Waveform Chart indicator and select Properties.
– In the Display Format tab select Default editing mode.
– Set Type to Absolute time.
– Notice that the Time axis now displays units of absolute date and time.
Modify the date and time in the initial time element of the waveform control.
What effect do you think this change will have on the waveform chart
indicator?
Run the VI.
Notice that the initial time on the left side of the Time axis now shows the new
initial time.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-16 | ni.com
Note To go back to displaying the time in seconds, right-click the
waveform chart indicator, select Properties, and set the type back to
Automatic formatting in the Display Format tab. You can also try
experimenting with the other Display Format Type options.
7. Try making additional modifications to t0, dt, and Y array, and examine the effects
on the chart indicator.
1D Array of Waveform
1. Open the Examine 1D Array (Waveform) Data Type VI from the Project Explorer
window.
2. Examine the 1D Array (Waveform) control on the front panel.
Notice that this 1D array contains three waveform elements. All three waveform
```
elements contain the same initial time (t0) and interval time (dt).
```
3. Examine the block diagram. The 1D Array (Waveform) control passes its data
directly to the Waveform Chart indicator.
4. Observe the behavior of the VI.
Run the VI.
Notice that when you pass a 1D array of waveforms to a chart, the chart
displays each waveform in the array as a separate plot.
1 The waveform at index 0 contains data values representing 1 sine wave.
2 The waveform at index 1 contains data values representing 1.5 sine waves with
an amplitude offset of 3.
3 The waveform at index 2 contains data values representing 1.5 sawtooth waves
with an amplitude offset of 6.
1
2
3
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-17
5. Observe the effects of modifying the waveforms in the 1D Array (Waveform)
control.
Change the dt of one of the waveforms from 0.1 to 0.2. Run the VI to observe
the effect.
Change the t0 of one of the waveforms, e.g. from 6:05:10.000 to
6:05:11.000.
Run the VI to observe the effect.
End of Exercise 8-2
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-18 | ni.com
B. Working with Single-Channel Acquisition
Data
In this section, we will learn how to work with single-channel acquisition data.
If you are acquiring one-channel, one-sample data set , it will typically be returned as
a DBL numeric data type.
If you are acquiring 1-channel,N-sample, in other words, a multi-sample data set, it
will typically be returned as either a 1D DBL array¬ or a waveform data type.¬
```
Demonstration: Viewing Single-Channel Acquisition Data
```
```
Processing Data—1ChanNSamp (Waveform)
```
Now let's look at how to process 1-channelN-sample data when it is represented as
a waveform data type.
```
Math Functions (Waveform)
```
In the example shown in the following figure, the DAQmx Read is returning a
waveform data type that represents 1-channel,N-sample data.
Let’s look at how the math functions work with the waveform data type.
If you use a math function, such as an Add function, to add a waveform and scalar
```
(like a single numeric), the Add function adds the scalar value to every single data
```
point in the waveform.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-19
As shown here, the original waveform contained a sine signal. So when you add a
scalar 3 to the waveform, the result is the entire waveform is offset by a value of 3.¬
If you use a math function, such as an Add function, to add a waveform with another
waveform, the Add function will add each corresponding point from each waveform
together. When you add a sine waveform with a noise waveform, the result is a noisy
sine waveform, as shown in this example.
When performing a math operation on two waveforms, make sure that both
```
waveforms have the same dt (interval time) and same number of data points (Y array
```
```
length).
```
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-20 | ni.com
```
Processing Data—1ChanNSamp (1D DBL Array)
```
Next, we will look at how to process 1-ChannelN-Sample data when it is represented
as a 1D DBL array data type.
```
Math Functions (1D DBL)
```
In this example, the DAQmx Read is returning a 1D DBL array data type that
represents 1-channel,N-sample data.
If you use a math function, such as an Add function, to add a 1D DBL array and a
```
scalar (like a single numeric), the Add function will add the scalar value to every single
```
data point in the 1D DBL array.
The original waveform contained a sine signal. So when you add a scalar 3 to the 1D
DBL array, the result is the entire waveform is offset by a value of 3.
If you use an Add function to add a 1D DBL array with another 1D DBL array, the Add
```
function adds each element pair together. But it will only do this until the last element
```
in the shorter array.¬
Notice in the second example, the top array has 3 elements and the bottom has
4 elements, so the array result only contains 3 elements.¬
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-21
```
Analysis Functions (1D DBL)•
```
Some analysis functions only work with the waveform data type and will not work with the 1D DBL array data type.
•
Some analysis functions work the same, whether the data type is waveform or 1D DBL array.
•
Some analysis functions require an additional timing input if the signal input is a 1D DBL array data type. This is because the 1D DBLarray data type only contains data values but does not contain any timing information.In this example, the Butterworth Filter VI receives 1D DBL array data from the DAQmx Read VI. This VI also provides the samplingfrequency from the DAQmx Task Property Node to the Filter Analysis VI.
¬
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-22 | ni.com
Exercise 8-3: Using Analysis Functions and VIs to
Analyze Data
Goal
Use analysis tools on your VI block diagram to analyze data.
Instructions
Analysis tools with the Waveform Data Type
1. Open C:\Exercises\LabVIEW Core 1\Analysis tools\
Analysis tools.lvproj.
2. From the Project Explorer window, open the Using Analysis tools (Waveform data
```
type) VI.
```
3. Examine the front panel and the block diagram.
```
Set Physical Channel, Desired Sample Rate (Hz), and Number of Samples
```
controls appropriately to acquire a signal from your DAQ device.
Note Make sure that you have your thermocouple connected to the
Thermocouple Input Connector, and that the BNC/Thermocouple Switch is
in the right position.
Notice that this VI performs a continuous acquisition.
Notice that the Acquired Signal indicator is a waveform data type.
4. Observe the behavior of the VI.
Run the VI.
On the front panel, observe the behavior or the Acquired Signal waveform
chart.
Stop the VI.
5. Analyze your data using analysis tools form the Signal Processing palette.
Right-click in block diagram, find the Amplitude and Levels VI under Signal
Processing»Waveform Measurements, and drag it to the block diagram.
Place it inside the loop.
Simulated Hardware BNC-2120
Physical Channel PCI-6221/ai1 PCI-6221/ai1
```
(Thermocouple Input)
```
```
Desired Sample Rate (Hz) 1000 2560
```
Number of Samples 1000 256
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-23
```
Wire the data output of DAQmx Read VI to the signal(s) in input of the
```
Amplitude and Levels VI.
Find and place Greater? and Select functions inside the loop.
Wire the VI as shown in the following figure.
This is to compare the high state level value of each iteration to the previous
one, and if it is greater, then VI overwrites the value passed to the max value
indicator. If the new value is less than the previous one, then VI proceeds to
the next iteration while keeping the previous value. The initial 0 constant wired
to the shift register initializes the first value as 0.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-24 | ni.com
6.

View the results of the analysis tool.
Switch to the front panel and arrange the items as shown in the following figure.Run the VI and keep it running for a couple of seconds. Notice that the
max value
indicator is constantly rising and peaks at some
point.Stop the VI.Save the VI.
Your TurnExperiment with using other analysis tools.End of Exercise 8-3
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-25
C. Working withN-Channel Acquisition Data
In this section, we will learn how to work with multiple-channel acquisition data.
N-Channel Acquisition Data Types
If you are acquiringN-Channel, 1-Sample data, it will be returned as a 1D DBL array
data type, where each element represents one sample from each channel.
If you are acquiringN-Channel,N-Sample data, it will be returned either as a 2D DBL
array data type or 1D waveform array data type. For the 2D DBL array data type, each
row represents multiple samples from one channel. For the 1D waveform array data
type, each waveform element represents multiple samples from one channel.
```
Demonstration: VisualizingN-Channel Data
```
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-26 | ni.com
Exercise 8-4: VisualizingN-Channel Data
Goal
• Become familiar with the different data types that representN-channel data.
• View multiple channels of data in chart, graph, and array indicators.
Scenario
Select the column that best matches the needs of your applications.
Check the option that best matches the needs of your applications.
```
Based on your answers to the previous questions, check which scenario(s) are most
```
relevant to your applications.
Waveform Array
```
I need to store the t0 (initial time of the
```
```
measurement) and dt (time interval
```
```
between samples) of my acquired data.
```
I only need to store the numeric values
of the samples of my acquired data.
N Channels, 1 Sample
N Channels,N Samples
N Channels, 1 Sample | Data type: 1D DBL Array
N Channels,N Samples | Data type: 1D Waveform Array
N Channels,N Samples | Data type: 2D DBL Array
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-27
Instructions
1. Open C:\Exercises\LabVIEW Core 1\Visualize N-Channel Data\
Visualize N-Channel Data.lvproj.
2. Follow the instructions for the scenarios you selected in the Scenario section.
```
N-Channel, 1-Sample (1D DBL Array)
```
In this section, you create a VI that acquires and visualizes one data sample from each
of the three different data sources at a rate of 1 Hz.
```
(BNC-2120) and (Simulated Hardware) Modify this VI to acquire 3 channels of voltage
```
```
(Sine Wave Function, TTL Square Wave Function and Temperature Reference) from
```
PCI-6221/ai0, PCI-6221/ai2:3.
1. From the Project Explorer window, open theN-Channel 1-Sample (1D DBL) VI.
2. Examine the properties of the DAQmx Create Channel VI.
Click polymorphic VI selector of the DAQmx Create Channel VI and explore
the selected instance.
Notice that this VI is configured for a Voltage measurement. You can modify
this configuration if you want to acquire from a different type of measurement.
3. Examine the DAQmx Timing VI.
Notice that the sample rate is set to1 Hz. This sets the DAQ device to acquire
1 sample per channel per second.
4. Examine the DAQmx Read VI.
Click polymorphic VI selector of the DAQmx Read VI and explore the selected
instance.
Notice that this VI is set to Multiple Channels and Single Sample. This VI will
return a 1D DBL array that contains a single sample from multiple channels.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-28 | ni.com
5. Create the front panel.
6. Modify the block diagram, as shown in the following figure, to visualize the
multiple channels single samples data.
1 Waveform Chart—Add a Waveform Chart to the front panel. Expand the plot
legend to display three plots.
2 Numeric Array Output—Add a Numeric Array control to the front panel, right-click
the control and press Change to Indicator. Resize this indicator to show 3 or more
elements and rename it 1D Numeric Output.
1
2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-29
7.

Configure the
Waveform Chart
properties.
Resize the plot legend to show 3 plots.Double-click
Time
on the x-axis and rename it as
Sample
```
. The 1D array (DBL) data type does not contain any timing information, so
```
the x-axis just represents the sample number.Double-click the minimum and maximum numbers on the axis and change them to
0
and
10
. Now the waveform chart will show the
most recent 10 samples per channel acquired.Right-click the waveform chart and select
Chart History Length
. Notice that the history length is set to 1024 by default.
This setting determines the maximum number of points per plot that the chart can show.
1
Array to Cluster
—This function converts the 1D array data type to a cluster data type. To plot a single sample from multiple channels
on a waveform chart, you must pass the waveform chart a cluster data type containing the samples.
2
Waveform Chart
—Chart that can be used to show historical data and append new data.
3
1D Numeric Output
—This array indicator displays only the current array data in a specific iteration.
1
2
3
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-30 | ni.com
8.

Your front panel should look similar to the following figure when the VI is running.
9.

Test the VI.
On the front panel, set the
Physical Channel
control to
PCI-6221/ai0, PCI-6221/ai2:3
. This creates a DAQmx task that includes
PCI-6221 channels 0, 2, and 3.Run the VI and notice the following things.–
```
The rate input (1 Hz) of the DAQmx Read VI controls the loop period.
```
–
Every iteration, one sample from 3 channels are updated on the waveform chart.
–
Every iteration, the 1D DBL Array indicator only shows the data for the current iteration.
–
```
The x-axis of the waveform chart is in units of Sample number (not seconds).
```
–
The waveform chart shows the most recent 10 samples per channel acquired.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-31
Double-click the minimum and maximum numbers on the x-axis and change
them to 0 and 5. Now the waveform chart will show the most recent 5
samples per channel acquired.
Stop the VI when finished.
10. To clear the waveform chart between runs of the VI, right-click the chart and
select Data Operations»Clear Chart.
```
N-Channel,N-Samples (1D Waveform Array)
```
In this section, you create a VI that acquires and visualizes 3 channels of analog input
voltage. Each loop iteration acquires/visualizes 1000 samples per channel. The
samples are continuously acquired at a hardware timed rate of 1000 Hz. The
```
waveform data type contains the sample values (Y), the start time for the samples
```
```
(t0), and the time interval between each sample (dt).
```
```
(BNC-2120) and (Simulated Hardware) Modify this VI to acquire 3 channels of voltage
```
```
(Sine Wave Function, TTL Square Wave Function and Temperature Reference) from
```
PCI-6221/ai0, PCI-6221/ai2:3, at a sample rate of 2,560 Hz and number of samples
of 256.
1. From the Project Explorer window, open theN-ChannelN-Samples (1D Waveform)
VI.
2. Examine the DAQmx Create Channel VI.
Click polymorphic VI selector of the DAQmx Create Channel VI and explore
the selected instance.
Notice that this VI is configured for an Analog Input Voltage measurement.
Modify the configuration if you want to acquire from a different type of
measurement.
3. Examine the sample rate and number of samples controls.
```
The Desired Sample Rate (Hz) control sets sample rate of this DAQ task.
```
The Number of Samples control sets how many samples per channel the
DAQmx Read VI will wait for and output in each loop iteration.
If the sample rate is 1000 Hz and number of samples is 1000, then during each
While Loop iteration, the DAQmx Read VI acquires from multiple channels at
a sample rate of 1000 Hz and outputs 1000 samples per channel.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-32 | ni.com
4. Examine the DAQmx Read VI.
Click polymorphic VI selector of the DAQmx Read VI and explore the selected
instance.
Notice that this VI is set to Analog»Multiple Channels»Multiple Samples»1D
```
Waveform (Samples).
```
5. Create the front panel.
Add a waveform graph to the front panel. Resize the plot legend to show 3
plots.
Add a waveform chart to the front panel. Resize the plot legend to show 3
plots.
Create a 1D waveform array indicator.
– Add an array shell on the front panel. Rename it
1D Waveform Indicator.
– Add a waveform control inside the unconfigured array.
– Resize the array to show 4 elements.
– Right-click the array and select Change to Indicator.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-33
6.

Modify the block diagram, as shown in the following figure.
7.

Configure the Waveform Graph properties.
Switch to the front panel and double-click
Time
on the x-axis and rename it as
```
Time (s)
```
. The waveform data type contains timing
information in units of seconds.
8.

Configure the waveform chart properties.
Right-click the
Waveform Chart
indicator and select
Properties
, then in the
Display Format
tab make sure that the
Default editing
mode
is selected and set Type to
Floating point
. Click OK to save changes.
Double-click
Time
on the x-axis and rename it
```
Time (s)
```
. The Waveform data type contains timing information in units of seconds.
Double-click the minimum and maximum numbers on the x-axis and change them to
0
and
5
. Now the waveform chart will show the
most recent 5 seconds of data acquired.Right-click the waveform chart then select
Chart History Length
and change the history length from 1,024 to 5,000.
This setting determines the maximum number of points per plot that the chart can show.
Note

Because this VI acquires 1000 samples per channel per second, changing the history length to 5,000 configures the chart
to show 5,000 samples per channel, which is equivalent to the most recent 5 seconds of data.
1
Waveform Graph
—Graphs display the current array data in a specific iteration.
2
Waveform Chart
—Chart that can be used to show historical data and append new data.
3
1D Waveform Indicator
—This indicator displays only the current data in a specific iteration. Each array element is the waveform data
received from an individual channel.
1
2
3
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-34 | ni.com
9.

Your front panel should look similar to the following figure when the VI is running.
l
10. Test the VI.
On the front panel, set the
Physical Channels
control to
PCI-6221/ai0, PCI-6221/ai2:3
. This creates a DAQmx task that includes
PCI-6221 analog input channels 0, 2, and 3.Run the VI.Notice that the following things happen every iteration.–
Multiple samples from 3 channels are appended to the waveform chart.
–
```
The waveform graph shows the data only for the current iteration (that is, the 1,000 samples read in that specific iteration).
```
–
The 1D waveform indicator shows the data only for the current iteration.I
```
Notice that the x-axis of the waveform chart is in units of time (s). This is because the waveform data type includes timinginformation.Stop the VI when finished.Copyright 2020 National Instruments
```
LabVIEW Core 1
© National Instruments Corporation | 8-35
```
N-Channel,N-Samples (2D DBL Array)
```
In this section, you create a VI that acquires and visualizes 3 channels of analog input
voltage. Each loop iteration acquires/visualizes 256 samples per channel. The samples
are continuously acquired at a HW-timed rate of 2,560 Hz. The 2D DBL array data type
contains the sample values.
```
(BNC-2120) and (Simulated Hardware) Modify this VI to acquire 3 channels of voltage
```
```
(Sine Wave Function, TTL Square Wave Function and Temperature Reference) from
```
PCI-6221/ai0, PCI-6221/ai2:3 at a sample rate of 2,560 Hz and number of samples of
256.
1. From the Project Explorer window, openN-ChannelN-Samples (2D DBL) VI.
2. Examine the DAQmx Create Channel VI.
Switch to the block diagram, click the polymorphic VI selector of the DAQmx
Create Channel VI and explore the selected instance.
Notice that this VI is configured for an Analog Input Voltage measurement.
Modify the configuration if you want to acquire from a different type of
measurement.
3. Examine the sample rate and number of samples controls.
```
The Desired Sample Rate (Hz) control sets the sample rate for this DAQ task.
```
The Number of Samples control sets how many samples per channel the
DAQmx Read VI will wait for and output in each loop iteration.
If the sample rate is 2,560 Hz and number of samples is 256, then during each
While Loop iteration, the DAQmx Read VI will acquire from multiple channels
at a sample rate of 2,560 Hz and output 256 samples per channel.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-36 | ni.com
4. Examine the DAQmx Read VI.
Click the polymorphic VI selector of the DAQmx Read VI and explore the
selected instance.
Notice that this VI is set to Analog»Multiple Channels»Multiple Samples»
2D DBL.
5. Create the front panel.
Switch to the front panel, add the following indicators.
– Waveform Graph indicator
– Waveform Chart indicator
– 2D Array indicator
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-37
6.

```
Modify the block diagram, as shown in the following figure, to visualize the multiple channels multiple samples (2D DBL) data.
```
7.

Configure the waveform graph properties.
Switch to the front panel.Resize the plot legend to show 3 plots.Double-click
Time
on the x-axis and rename it as
Sample
. The 2D DBL data type does not contain any timing information, so the
x-axis just represents the sample number.
1
Transpose 2D Array
—You must transpose the 2D array before passing it to the chart for the chart to correctly interpret the 2D array as
4 channels of data with 256 samples per channel.
2
Waveform Graph indicator
—Graph that displays the current array data in a specific iteration.
3
Waveform Chart
indicator—
Chart that can be used to show historical data and append new data..
4
2D Numeric Array indicator
—This indicator displays only the current data in a specific iteration. Each row contains the data points for
a channel. When you run this VI, you will notice that for a “3 channel, 256 samples per channel” acquisition, the 2D array has 3 rowsand 256 columns.
2
1
3
4
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-38 | ni.com
8.

Configure the waveform chart properties.
Resize the plot legend to show 3 plots.Double-click
Time
on the x-axis and rename it as
Sample
. The 2D DBL data type does not contain any timing information, so the
x-axis just represents the sample number.Double-click the minimum and maximum numbers on the x-axis and change them to
0
and
1280
. Now the chart will show the most
recent 1,280 samples per channel acquired.Right-click the waveform chart then select
Chart History Length
and change the history length from 1,024 to 1,280. This setting
determines the maximum number of points per plot that the chart can show.
Note

Because this VI acquires 256 samples per channel per second, changing the history length to 1,280 configures the chart
to show 1,280 samples per channel, which is equivalent to most recent 5 seconds of data.
9.

Your front panel should look similar to the following figure when the VI is running.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-39
10. Test the VI.
On the front panel, set the Physical Channels control to PCI-6221/ai0,
PCI-6221/ai2:3. This creates a DAQmx task that includes PCI-6221 analog
input channels 0, 2, and 3.
Note Set the Physical Channels control to channels that are appropriate for
your DAQ device.
Run the VI.
Notice that the following things happen every iteration.
– Multiple samples from 3 channels are appended to the waveform chart.
```
– The waveform graph shows the data only for the current iteration (that is,
```
```
the 1,000 samples read in that specific iteration).
```
– 2D numeric array indicator shows the data only for the current iteration.
Notice that the x-axis of the waveform chart indicates the sample number of
```
a data point (not seconds). This is because the 2D DBL data type does not
```
includes timing information.
Stop the VI when finished.
End of Exercise 8-4
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-40 | ni.com
Common Array Functions
The Build Array function concatenates multiple arrays or appends elements to an
n-dimensional array.
Pay attention to the difference in the thickness of output wires for the two Build Array
function.
Refer to LabVIEW Help for more information about common array functions.
```
Multimedia: Common Array Functions
```
BecauseN-Channel data is represented by a 1D waveform or 2D DBL array data type,
you can manipulate the data using the Array functions.
Complete the multimedia module,Common Array Functions, available in the
```
C:\Exercises\LabVIEW Core 1\Multimedia folder.
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-41
Extract Subset of
N-Channel Array
In this example, the DAQmx Read VI returns
N-Channel
N-Sample data as a 1D waveform data type.
We can extract one channel’s data by using the Index Array function. The Index input specifies which channel to extract.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-42 | ni.com
Exercise 8-5: Extracting a Subset of anN-Channel
```
Data Array (Optional)
```
Goal
Extract a single channel of data using the Index Array function.
Extract multiple channels of data using the Array Subset function.
Scenario
In this exercise, the acquisition data is a 1D waveform array containing the following
data.
Hardware Setup
```
(BNC-2120) Make sure that you have Sine/Triangle BNC Connector connected to the
```
Analog Input 2 and the TTL Square Wave BNC Connector connected to the Analog
input 3, also make sure that the Sine/Triangle Waveform Switch is set to Sine.
Explore acquisition data in an existing VI
1. Open C:\Exercises\LabVIEW Core 1\Extract Data from
N-Channel Array\Extract Data from N-Channel Array.lvproj.
2. From the Project Explorer window, open the Extract Data fromN-Channel Array
```
(1D Waveform) VI.
```
3. Explore the front panel and the block diagram.
The block diagram code performs a continuous acquisition.
By clicking polymorphic VI selector of the DAQmx Read VI and exploring the
selected instance you can determine that this VI readsN samples fromN channels
and returns the data as a 1D waveform array.
1D Waveform Array Index Signal Description
0 Temperature Reference / Simulated Input 1
1 Sine Wave Function / Simulated Input 2
2 TTL Square Wave Function / Simulated Input 3
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-43
4. Examine the behavior of the VI.
On the front panel, set the Physical Channels control to PCI-6221/ai0,
PCI-6221/ai2:3.
This creates a DAQmx task that includes PCI-6221 analog input channels 0,
2, and 3.
```
Set Desired Sample Rate (Hz) to 2560.
```
Set Number of Samples to 256.
Note Set the Physical Channel, Rate, and Number of Samples controls to
values that are appropriate for your DAQ device.
5. Run the VI.
Notice that the All Channels indicator displays data for the three channels
specified by the Physical Channels control:
– AI0 channel
– AI2 channel
– AI3 channel
6. In this exercise we are going to separate these three channels into different data
sets.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-44 | ni.com
Extract Data for a Single Channel
1. Modify the block diagram, as shown in the following figure, to extract data for a
single channel.
2. Use the context help andLabVIEW Help to learn about the Index Array function.
3. Test the VI.
On the front panel, set the following values.
Run the VI.
Change the value of the index control to 0, 1, and 2. Notice that this control
determines which channel is extracted and displayed in the Indexed Channel
indicator.
Stop the VI when finished.
4. Save the VI.
1 Index Array function—When you pass this function a 1D waveform array and an
index value, this function will return a single waveform element at the specified
index in the 1D waveform array.
Physical Channel PCI-6221/ai0, PCI-6221/ai2:3
Rate 2560
Number of Samples 256
1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-45
Extract a Subset of Channels
1. Modify the block diagram, as shown in the following figure, to extract a subset of
channels.
2. Use the context help and detailedLabVIEW Help to learn about the Array Subset
function.
3. Test the VI.
On the front panel, set the following values.
Run the VI.
Notice that the Indexed Channel indicator displays the AI3 channel.
```
1 Index Array function—Use this function to extract the third channel (index 2).
```
Right-click the Index control, select Change to Constant. Set the constant value
to 2.
2 Array Subset function—Use this function to extract the first and second channels
```
(indices 0 and 1).
```
a. Right-click the index input and select Create Constant. Set the constant value
to 0.
b. Right-click the length input and select Create Constant. Set the constant
value to 2.
c. Right-click the subarray output and select Create Indicator. Rename the
indicator as Subset of Channels.
Physical Channel PCI-6221/ai0, PCI-6221/ai2:3
Rate 2560
Number of Samples 256
1
2
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-46 | ni.com
Notice that the Subset of Channels indicator displays the AI0 and AI2
channels.
Stop the VI when finished.
4. Save the VI.
Extract a Subset of Channels—Alternate Approach Using
Index Array and Build Array
1. From the Project Explorer window, open the [Alternate Method] Extract Data from
```
N-Channel Array (1D Waveform) VI.
```
Notice how this VI uses the Index Array function to extract multiple channels
and then group them together into a new array using the Build Array function.
2. Add a new Index Array function and a Build Array function.
Notice how you can resize the Index Array function to extract multiple array
elements. Notice how you can resize the Build Array function to take multiple
inputs. Use the context help and detailedLabVIEW Help to learn about these
two functions.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-47
Explore How to Extract Channels From 2D DBL Array Data
Type
1. From the Project Explorer window, open the Extract Data fromN-Channel Array
```
(2D DBL) VI.
```
2. Examine the behavior of the VI.
On the front panel, set the following values.
Run the VI.
Stop the VI when finished.
3. On the block diagram, Click polymorphic VI selector of the DAQmx Read VI and
explore the selected instance.
Notice that the DAQmx Read VI is using the floating point data type. Notice
that the output data type is 2D DBL array.
4. Notice that the Index Array function is used to extract one channel of data
```
(1D array = 2,560 samples from channel 0).
```
Physical Channel PCI-6221/ai0, PCI-6221/ai2:3
Rate 2560
Number of Samples 256
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-48 | ni.com
5. Notice that wiring a 2D array to the Index Array function causes the Index Array
```
function to show both a row index input and column index input.
```
```
If you want to extract a row (1D array) from a 2D array, only wire the index
```
```
of the row to the index (row) input and leave the disabled index (col) input
```
unwired.
```
If you want to extract a column (1D array) from a 2D array, only wire the index
```
```
of the column to the disabled index (col) input and leave the index (row) input
```
unwired.
```
If you want to extract an individual element (single numeric) from a 2D array,
```
```
then wire the row index to the index (row) input and wire the column index to
```
```
the disabled index (col) input.
```
In this VI, the 2D array wired to the Index Array function contains 3 rows and
2,560 columns, where each row represents 2,560 samples acquired from one
```
channel. Therefore, to extract one channel of data (represented by 1D array),
```
this VI wires the row index and leaves the column index unwired to extract
one row of data from the 2D array.
6. Notice that the Array Subset function is used to extract two channels of data.
A row index of 0 and a length of 2 causes this function to extract 2 rows of
data starting from row index 0.
Your Turn
Option 1
1. Create a VI that acquiresN-channelN-sample data and try extracting individual or
groups of channels from that acquisition data array.
2. (Simulated Hardware) Try acquiring 4 channels (10 samples per channel) of data.
Extract an individual channel or groups of channels.
Option 2: Experiment with Index Array and Array Subset functions
1. From the Project Explorer window, open [Unguided] Example 2D Array VI.
2. Familiarize yourself with the functionality of the Index Array and Array Subset
functions by wiring the 2D array to these functions, experimenting with how the
input terminal values of these functions affect their output values, and exploring
theLabVIEW Help.
You can resize the Index Array function to extract more than one element/row/column.
End of Exercise 8-5
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-49
Process Every Channel in anN-Channel Array
When working with anN-channel array, a common task is to run the same processing
algorithm on every channel of theN-channel data.
To do this we can use a For Loop with an auto-indexing tunnels.
```
Concept: Auto-Indexing Tunnels
```
For Loops and While Loops can configure an input tunnel to iterate through an array’s
elements and configure an output tunnel to build an array. This is known as
auto-indexing.
While working with an array, you might want to access every element of the array
individually. You can use a For Loop with an auto-indexing input tunnel to process one
element of an array during each iteration of the loop.
In this case, there is no need to wire the N terminal of the For Loop. The For Loop will
execute the exact number of iterations necessary to iterate through each element of
the array. This example has a 15-element array wired to the auto-indexing input
tunnel, so the For Loop will execute 15 iterations with each iteration extracting the
next element in the array.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-50 | ni.com
A For Loop with an auto-indexing input tunnel behaves similarly to a for-each loop in
other programming languages.
If the N input is wired and multiple arrays of different sizes are wired to the
auto-indexed tunnels, the For Loop uses the smallest of the choices to determine the
number of loop iterations.
For example, the VI has an N input of 10, a 5 element array, and a 3 element array.
The For Loop chooses the smallest of these, which is 3, and executes only 3 loop
iterations. The final iteration indicator shows 2 because the iteration terminal starts
counting at 0.¬
```
Concept: Auto-Indexing Output Tunnel
```
If you want to collect the result of each loop iteration in an array, set the output tunnel
append mode to Indexing values to pass an array of those values out of the loop.
If you want an output tunnel to return only the value from the last loop iteration, set
the output tunnel append mode to Last Value instead.
To configure the behavior of an output tunnel on a loop, right-click the tunnel and
navigate to Tunnel Mode to configure its append mode.
```
Concept: Auto-Indexing with a Conditional Tunnel
```
Additionally, you can determine which values to write to an auto-indexing output
tunnel based on a condition.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-51
o do this, right-click the auto-indexing output tunnel and navigate to Tunnel Mode and
select Conditional. Now, the auto-indexing output tunnel will only store a value if the
conditional input is TRUE.
In the following example, only values that are less than 5 will be written to the
auto-indexing output tunnel.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-52 | ni.com
Exercise 8-6: Exploring Auto-Indexing Tunnels
Goal
Explore the behavior of auto-indexing input and output tunnels.
Instructions
1. Open C:\Exercises\LabVIEW Core 1\Auto-Indexing\
Auto-Indexing.lvproj.
2. From the Project Explorer window, open the Auto-Indexing Tunnels VI.
3. Modify the block diagram, as shown in the following figure, to create an
auto-indexing input tunnel and auto-indexing output tunnel to the For Loop.
Wire the 1D DBL Array Input control to the left border of the For Loop, which
by default creates an auto-indexing input tunnel. Then, wire the input tunnel
to the Input Tunnel Result indicator.
Note If you wire an array to a For Loop or While Loop, you can read and
process every element in that array by enabling indexing. When you wire an
array from an external node to an input tunnel on the loop border and enable
indexing on the input tunnel, elements of that array enter the loop one at a
time, starting with the first element.
Wire the output of the Multiply function to the right border of the For Loop,
which by default creates an indexing output tunnel. Then, wire the output
tunnel to the Output Tunnel Result indicator.
Note For indexing output tunnels, scalar elements accumulate sequentially
into 1D arrays, 1D arrays accumulate into 2D arrays, and so on.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-53
4. Right-click the indexing input tunnel. In the appeared menu you can set the
behavior of any loop input tunnel to enable or disable indexing.
5. Right-click the indexing output tunnel. In the Tunnel Mode section, notice that
Indexing is selected. This is where you can set the behavior of any loop output
tunnel to Last Value, Indexing, or Concatenating.
6. Turn on Highlight Execution.
7. Run the VI.
On the front panel, observe the behavior of each control/indicator.
On the block diagram, observe how elements of the 1D DBL Array enter the
loop one at a time, starting with the first element.
Observe how the Output Tunnel Result indicator is a 1D array that consists of
every result passed into the indexing output tunnel while the For Loop
executed.
Notice how the For Loop output tunnel does not return anything until the entire
For Loop has finished executing.Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-54 | ni.com
Run the VI multiple times with Highlight Execution turned on to make all the
above observations.
Stop the VI when finished.
8. Save the VI.
Comparing the Behavior of Auto-Indexing vs. Keeping Last
Value
1. Open Compare Auto-Index and Last Value VI.
2. Explore the front panel and the block diagram.
Notice that for each For Loop input tunnel and output tunnel, there is an
indexing indicator and a last value indicator.
On the block diagram, select each tunnel. Notice how each tunnel is
configured.
Turn on Highlight Execution.
3. Run the VI.
Observe the differences in data type and behavior for the input tunnels.
Observe the differences in data type and behavior for the output tunnels.
Stop the VI when finished.
4. Save the VI.
End of Exercise 8-6
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-55
Techniques for Processing Every Channel inN-Channel Array
Now that you know how to use For Loops with auto-indexing tunnels, you can use
this technique to iterate through each channel in anN-Channel data array, process
each channel, and output the processed results of each channel to another array.
Conveniently, some math and analysis VIs and functions can automatically adapt to
process anN-Channel array.
For example, if you pass anN-Channel array to a Multiply function, the Multiply
```
function will multiply every point in every channel. If you pass anN-Channel array to
```
a Butterworth Filter VI or FFT Spectrum VI, those analysis functions will return an
array containing the processed results for each channel.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-56 | ni.com
Exercise 8-7: Processing Data For Each Channel in an
N-Channel Data Array
Goal
Process data for each channel by using a For Loop to iterate through each channel in
anN-channel data array.
Process Channels Using VIs Compatible withN-Channel
Array Data Types
1. Open C:\Exercises\LabVIEW Core 1\Process N-Channel Array\
Process N-Channel Array.lvproj.
2. From the Project Explorer window, open ProcessN-Channel Array VI.
3. Examine the VI.
Explore the front panel and the block diagram.
Notice that the data output of the DAQmx Read VI is a 1D waveform array
data type.
Run the VI.
Stop the VI when finished.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-57
4. Modify the block diagram, as shown in the figure below, to process all channels
by scaling their values by 100 and filtering the signals using the following items.
i
Note Many Math VIs and functions can adapt to accept the 1D waveform
array data type. A real-world application can use Math VIs and functions to
scale acquired data from units of voltage to the appropriate engineering unit,
```
such as temperature (deg Celsius), acceleration (g), etc.
```
1 Multiply function—The input of this function can adapt to accept the 1D
waveform array data type.
2 Right-click in the block diagram and search for the DBL Numeric Constant, then
wire it to the second input of the Multiply function. Set the value of the constant
to 100. This function will multiply all Y values in every waveform element in the
array by 100.
3 Right-click the output of the Multiply function and select Create Indicator.
Rename the indicator Scaled Channels.
4 Digital IIR Filter VI—Right-click in the block diagram, click Search from the
Functions palette and type Digital IIR Filter. Drag the first appeared result
into the while loop. Wire the 1D waveform array from the DAQmx Read VI to the
input of the Digital IIR Filter VI. Notice that the Digital IIR Filter VI will process
each waveform contained in the array.
5 Right-click the IIR filter specifications input and select Create Control.
6 Right-click the signal out output of the Digital IIR Filter VI and select Create
Indicator. Rename the indicator as Filtered Channels.
12
3
5
4
6
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-58 | ni.com
5.

Arrange and modify your front panel similar to the following figure. Make sure that the
IIR filter specifications
cluster control is set as
shown in the figure.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-59
6. Examine the behavior of the VI.
On the front panel set the Physical Channels control to PCI-6221/ai0,
PCI-6221/ai2:3.
```
– (BNC-2120) Make sure that you have Sine/Triangle BNC Connector
```
connected to the Analog Input 2 and the TTL Square Wave BNC Connector
connected to the Analog input 3, also make sure that the Sine/Triangle
Waveform Switch is set to Sine.
```
– (BNC-2120 and Simulated Hardware) Set the value of Lower Fc
```
control to 1.
Run the VI.
Notice that the Scaled Channels and Filtered Channels waveform graph
indicators show that the Multiply function and Digital IIR Filter VI processed all
channels in the 1D waveform array.
Stop the VI when finished.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-60 | ni.com
Process Channels Using a VI that is not Fully Compatible with
N-Channel Array Data Types
1. Modify the block diagram, as shown in the following figure, to run all channels
through a VI that is not fully compatible with the 1D waveform data type.
Note This For Loop code works for anyN-channel array, whether it
contains 2 channels or 16 channels.
1 For Loop—Add a For Loop to the block diagram.
2 RMS VI—Right-click in the block diagram, click Search from the Functions
palette, type RMS.vi. Drag the first appeared result into the while loop.
The input of this VI isn't fully compatible with 1D Waveform data type, because
if you wire the waveform directly to the input of this VI, the output will show the
RMS value for only one channel, instead of four used in this exercise.
3 Wire the data output of DAQmx Read VI to the left border of the For Loop and
into the RMS VI input. Notice the indexing input tunnel. On the first iteration of
the For Loop, this indexing input tunnel will return the first element in the array.
On the second iteration of the For Loop, this input tunnel will output the second
element in the array, and so on.
4 Wire the rms value output of the RMS VI to the right border of the For Loop. This
creates an indexing output tunnel. When the For Loop finishes executing, the
output of this indexing output tunnel will be a 1D array with its elements
containing what the indexing output tunnel received in each For Loop iteration.
5 Right-click the indexing output tunnel and select Create Indicator.
5
2
43
1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-61
2.

Arrange your front panel similar to the following figure.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-62 | ni.com
3. Examine the behavior of the VI.
Run the VI.
Notice that the RMS values 1D DBL array indicator shows the RMS value of
each channel, which means that the For Loop processed all channels in the 1D
waveform array.
Stop the VI when finished.
4. Save the VI.
Your Turn
The following pseudocode shows how to take one channel of data and process it to
```
display the data in the frequency domain (frequency vs. amplitude graph).
```
1. Create a copy of the VI in this exercise.
2. Modify the VI to perform the above algorithm on all channels.
Answer
The answer is located in the C:\Solutions\LabVIEW Core 1\Exercise 8-7 directory.
End of Exercise 8-7
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-63
D. Using Arrays
In this section, we will explore some additional real-world examples that use arrays.
Voltage Ramp
This example generates a voltage ramp on an analog output channel.
In this example, we want a linear ramp of 11 voltages, starting from 0 V and ending
at 5 V. We also want this VI to output each voltage for 1 second.
We can use the Ramp Pattern VI to programmatically generate a 1D DBL array that
contains our ramp values. Then we can wire this array to an auto-indexing input
tunnel, and the For Loop will write each ramp value to the analog output channel.
We can place the Wait function to set how many milliseconds we want the voltage
ramp to stay at each ramp value.
Lastly, we can use a DAQmx Write VI before the loop to set the initial analog output
voltage value and use a DAQmx Write VI after the loop to set a shutdown analog
output voltage value.¬
Stimulus-Response
This example outputs stimulus values on an analog output channel, waits for a defined
settling time, and then acquires the corresponding response values on an analog input
channel.
```
The stimulus values (V) array contains all the stimulus values, which is wired to an
```
auto-indexing input tunnel.¬The For Loop will read the stimulus values one at a time.
For each For Loop iteration, the auto-indexing input tunnel will output the next
stimulus value and write it to the analog output channel, wait for the specified settling
time, read the response value, and then write the response value to the auto-indexing
output tunnel.
After the For Loop completes, the output tunnel will output all the response values.
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-64 | ni.com
Additionally, this VI makes sure to write an initial value to the analog output channel
and a shutdown value to the analog output channel.
```
Generate Waveform Output (1D DBL)
```
If you need to generate a waveform signal on an analog output channel, you can use
a 1D DBL array.
This example VI generates a user-defined sine wave on a DAQmx analog output
channel.
The Sine Wave VI is configured to create a 1D DBL array of sine wave data points and
sends it to the DAQmx Write VI, which stores these data points in a hardware buffer
on the DAQ device.
Also, the sample rate is sent to the DAQmx Timing VI, which sets the rate at which
the DAQmx device will update the analog output channel’s voltage. For example, if
the sample rate is 10 Hz, the DAQmx device will update the analog output channel
every 0.1 seconds with the next data point.
When the DAQmx Start executes, the DAQmx device will output the data points
specified by the 1D DBL array at the specified sample rate. The VI will then go to the
DAQmx Wait Until Done VI and wait until the DAQmx device has finished outputting
all the data points.
```
Generate Waveform Output (Waveform)
```
If you need to generate a waveform signal on an analog output channel, you can use
a 1D DBL array.
This example VI generates a user-defined sine wave on a DAQmx analog output
channel.
The Basic Function Generator VI¬ is configured to create a 1D DBL array of sine wave
data points and sends it to the DAQmx Write VI, which stores these data points in a
hardware buffer on the DAQ device.
Also, the sample rate is sent to the DAQmx Timing VI, which sets the rate at which
the DAQmx device will update the analog output channel’s voltage. For example, if
the sample rate is 10 Hz, the DAQmx device will update the analog output channel
every 0.1 seconds with the next data point.
When the DAQmx Start executes, the DAQmx device will output the data points
specified by the 1D DBL array at the specified sample rate.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-65
The VI will then go to the DAQmx Wait Until Done VI and wait until the DAQmx device
has finished outputting all the data points.¬
Programmatically Create 2D Arrays
You can use two For Loops to programmatically create a two-dimensional array. In the
example shown in the following figure, the inner For Loop creates an array with 4
```
elements. The outer For Loop takes the output of the inner For Loop (the array with 4
```
```
elements), and places it as a row in a 2D array.
```
So the N input of the outer For Loop determines the number of rows in the 2D array,
and the N input of the inner For Loop determines the number of columns in the 2D
array.
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-67
```
Activity: Lesson Review
```
1. Which of the following items are a part of a Waveform but not included in a 1D
Array?
a. Data values
b. Time interval between data points
c. Start time
d. End time
2. In the below scenario, DAQmx Read outputs a 1D waveform array representing
multiple channels of data. You need to extract only one channel of data. Which
```
function should you use?
```
a. Array Size
b. Build Array
c. Index Array
d. None of the above
3. What is the value of the Result indicator after you run this VI?
a. 2
b. 4
c. 5
d. 9
e. 10
Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-68 | ni.com
4. If you are processing every channel in anN-channel array using a For Loop, what
type of tunnel do you need to use?
a. Keep last value
b. Concatenate values
c. Auto index values
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 8-69
```
Activity: Lesson Review – Answers
```
1. Which of the following items are a part of a Waveform but not included in a 1D
Array?
a. Data values
b. Time interval between data points
c. Start time
2. In the below scenario, DAQmx Read outputs a 1D waveform array representing
multiple channels of data. You need to extract only one channel of data. Which
```
function should you use?
```
a. Array Size
b. Build Array
c. Index Array
d. None of the above
3. What is the value of the Result indicator after you run this VI?
a. 2
b. 4
c. 5
d. 9
e. 10Copyright 2020 National Instruments
Lesson 8 Working with Groups of Data
8-70 | ni.com
4. If you are processing every channel in anN-channel array using a For Loop, what
type of tunnel do you need to use?
a. Keep last value
b. Concatenate values
c. Auto index values
Copyright 2020 National Instruments
9
Executing Code
Based on a
Condition
In this lesson, you learn how to execute code based on a
condition by using a Case Structure.
Topics
- Conditional Logic Introduction
- Creating and Configuring Case Structures
- Conditional Logic Usage
Exercises
Exercise 9-1 Executing Code Based on a Condition
Exercise 9-2 Executing Code Conditionally Based on a User
```
Setting/Parameter/Configuration (Optional)
```
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 9-3
A. Conditional Logic Introduction
In this section, we will talk about conditional logic.
Conditional logic
• If <condition>...
• Then <do action>...
• Else <do action>...
Conditional logic allows you to execute code based on a condition.
That is, if a particular condition is true , then do some action, else do some other
action.
For example, if the acquired temperature is greater than or equal to 100 degrees
Celsius, then display a warning dialog box and a message that the temperature has
exceeded the maximum limit.
Otherwise, display an indicator that the temperature is in normal range.¬
Conditional logic example
• If Temperature >= 100 deg Celsius
• Then
– Display “Temperature has exceeded the maximum heat threshold”
message
– Launch a Warning popup dialog
• Else Display “Temperature is in normal range” message
Let’s take a look at a VI that implements this conditional logic.
```
Demonstration: Conditional Logic
```
Copyright 2020 National Instruments
Lesson 9 Executing Code Based on a Condition
9-4 | ni.com
B. Creating and Configuring Case Structures
In this section, we will talk about creating and configuring Case structures.
When using a Case structure, the first thing you should do is to wire your condition
to the Case selector input. The value the VI passes to the Case selector input
determines which case to execute.
The Case selector label allows you to navigate through all the defined cases. You can
place your code in the corresponding case.
In the example in the following figure, the Greater Than function passes a True or False
value to the selector input of the Case Structure.
If the selector input receives a True value, then the Case structure executes the code
in the True case. If the selector input receives a False value, then the Case structure
executes the code in the False case.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 9-5
Enum gives users a list of items from which to select a case. The case selector connected to enum displays a case for each item in theenumerated type control.Demonstration: Using Enumerated Data Type with Case Structure
Copyright 2020 National Instruments
Lesson 9 Executing Code Based on a Condition
9-6 | ni.com
Selector Terminal—Data TypesThe Case Structure adapts its cases based on the data type wired into its selector input.For example, if you wire a Boolean to the selector input, the Case structure contains a True case and a False case.If you wire an integer to the Selector input, the cases can be a single number, multiple numbers, range of numbers, or a default case.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 9-7
If you wire a string to the selector input, the cases will be strings. If you wire an enum to the selector input, the cases will consist of theenum items.
Copyright 2020 National Instruments
Lesson 9 Executing Code Based on a Condition
9-8 | ni.com
If you wire an error wire to the Selector input, you get a No Error case and an Error case.When you add a new frame to a case structure that contains an Error case, the Error case becomes the Default case, and the new frame islabeled “Error 1”. You can edit this to have an arbitrary range of values.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 9-9
Input and Output TunnelsA Case structure can also include tunnels. An input tunnel is available to all cases if needed.If you have an output tunnel, you must define a value for every single case the tunnel outputs.•
The output tunnel is a solid color if you have wired a value to the output tunnel in every case.
•
The output tunnel is white with a thin border if there are one or more cases where the output tunnel is unwired.
•
You also have the option to configure an output tunnel to automatically use the default value of its data type if it’s unwired. In thatsituation, the tunnel is white with a thick border.In the following example, the bottom tunnel is a numeric data type, so the default value is 0.
```
Demonstration: Selector Terminal Types and Tunnels
```
Copyright 2020 National Instruments
Lesson 9 Executing Code Based on a Condition
9-10 | ni.com
C. Conditional Logic UsageIn this section, we will explore common examples of when you might use conditional logic.Execute Code Conditionally Based on User InputIf you want to execute code based on user input, you can wire a control terminal to a Case structure.In the example in the following figure, if the user sets the triggering enabled? control to TRUE, then the VI will execute the DAQmx TriggeringVI to set up this task to wait for a trigger. If the user sets the Triggering control to FALSE, then the VI will not execute the DAQmx TriggeringVI, so the task will not wait for a trigger.Execute Code Conditionally Based on Measurement ResultYou can also execute code conditionally based on a measurement result.In the following figure, the example VI reads a waveform, extracts the maximum value, and checks if that maximum value is greater than athreshold. This result is wired to the selector input of the Case structure.Now if waveform maximum is greater than the threshold, the Case structure will display the waveform in the Last Exceeded Accelerationgraph.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 9-11
Otherwise, the Case structure will do nothing because the False case is empty.
Copyright 2020 National Instruments
Lesson 9 Executing Code Based on a Condition
9-12 | ni.com
Exercise 9-1: Executing Code Based on a Condition
Goal
Use a Case structure to execute code based on a condition.
Hardware Setup/Scenario
BNC 2120 option
Make sure, that the thermocouple is connected to the Thermocouple Input
```
Connector (AI1) properly.
```
Execute Code Conditionally Based on a Measurement
Result—Conditionally Display Data on a Graph
1. Open C:\Exercises\LabVIEW Core 1\Execute Conditional Code\
Execute Conditional Code.lvproj.
2. From the Project Explorer window, open the Condition Based on Measurement
Result VI.
3. Explore the VI.
Explore the front panel and the block diagram.
Set the DAQmx Physical Channel input to PCI-6221/ai1.
Run the VI.
– Data will appear on the Current Temperature graph.
Stop the VI when finished.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 9-13
4. Modify the VI, as shown in the following figure, to display temperature data on
the Last exceeded temperature graph only if the temperature data has exceeded a
user-specified threshold.
5. Configure front panel items.
Configure the Last exceeded temperature waveform graph to show the
absolute time, so you can see the exact date and time of when the acquired
data last exceeded the threshold.
– Right-click on the waveform graph, then select X Scale»Formatting.
– In the opened window, make sure that the editing mode is set to Default
and select Absolute time in the Type section.
Wire this indicator as shown in figure above.
1 Waveform Min Max VI—The Y max output returns the maximum value of the Y
array in the waveform.
2 Greater? function—Right-click the y input of the Greater? function and select
```
Create Control. Rename it Temperature threshold (C) .
```
3 Case structure—This VI will use the Case structure to update the Last exceeded
temperature waveform graph indicator only when the acquired temperature
exceeds a threshold.
4 Last exceeded temperature indicator—Add a waveform graph indicator to the
front panel and wire the corresponding terminal as shown.
1 2
4
3
Copyright 2020 National Instruments
Lesson 9 Executing Code Based on a Condition
9-14 | ni.com
6. Arrange the front panel, as shown in the following figure.
7. Set the control values, as shown in the figure above. Otherwise set the values to
whatever is appropriate for your hardware setup.
8. (BNC 2120) Lower the Temperature threshold to 30.
You should be able to exceed the temperature threshold in the next step by firmly
pressing the thermocouple.
9. Examine the behavior of the VI.
Run the VI.
```
Adjust the value of the Temperature threshold (C) control and/or the acquired
```
signal, so that Current temperature exceeds Temperature threshold from time
to time.
Notice that every time the Current temperature graph contains a value above
```
the Temperature threshold (C) control value, that data is passed to the Last
```
exceeded temperature graph.
Notice that the x-axis of the Last exceeded temperature graph shows the
absolute date and time of the last temperature waveform that exceeded the
threshold.
Stop the VI when finished.
10. Select File»Save All to save the VI.
11. Close the VI.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 9-15
Challenge
Add code to the Condition Based on Measurement Result VI to display a running total
of number of times the threshold has been exceeded since the VI started running.
```
Hint: Use a shift register to store the running total. Increment the running total
```
in the Case structure.
```
Solution: Open C:\Solutions\Exercise 9-1\[Challenge] Condition Based
```
on Measurement Result with Running Total.vi.
On the Job
In your own applications, do you need to execute code conditionally based on a
measurement result? If so, describe it below.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 9-1
Copyright 2020 National Instruments
Lesson 9 Executing Code Based on a Condition
9-16 | ni.com
Exercise 9-2: Executing Code Conditionally Based on
a User Setting/Parameter/Configuration
```
(Optional)
```
Goal
Explore a DAQmx example that sets the triggering behavior based on a user-input.
Hardware Setup/Scenario
BNC 2120 option
Make sure, that the Quadrature Encoder’s UP/DN terminal is connected to the
PFI1 input.
1. Open C:\Exercises\LabVIEW Core 1\Execute Conditional Code Based on User
Input\Execute Conditional Code Based on User Input.lvproj.
2. From the Project Explorer window open the Condition based on User Input
```
(Triggering) VI.
```
3. Explore the block diagram.
Notice that the Case structure executes code based on the value of the
Triggering Enabled? control.
4. Test the VI.
Set the following control values.
Physical Channel PCI-6221/ai1
Digital Trigger Source PCI-6221/PFI1
Edge Rising
Triggering Enabled? On
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 9-17
Run the VI.
The VI is now waiting on the PCI-6221/PFI1 line to detect a rising edge from
a digital signal.
```
(BNC 2120) Rotate the Quadrature Encoder clockwise. The VI should
```
immediately return data on the Graph indicator.
If you set the Triggering Enabled? control to Off on the front panel and run the
VI again, you will see that VI immediately returns data and no longer waits for
a trigger.
```
(Simulated hardware) Because you are using a simulated DAQ device, the
```
PCI-6221/PFI1 line randomly changes between True and False. When this line
goes from False to True, the VI detects this as a rising edge, which triggers
the VI to acquire data.
On the block diagram, use execution highlighting to observe how the
Triggering Enabled? control value determines which case the Case structure
executes.
5. Close the VI when finished.
On the Job
In your own applications, do you need to execute code conditionally based on a user
```
input (e.g. Boolean On/Off button)? If so, describe it below.
```
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 9-2
Copyright 2020 National Instruments
Lesson 9 Executing Code Based on a Condition
9-18 | ni.com
Count the Number of Times a Condition OccursTo count the number of times a condition occurs in a loop, use a shift register to store the number of times a condition occurs and initializethat shift register to 0. If the condition occurs, read the current value of the left register, increment that value, and pass the value to theright shift register.If the condition does not occur, make sure to wire the left shift register through the False case to the right shift register, so that the currentvalue of the shift register is still passed to the next iteration.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 9-19
```
Activity: Lesson Review
```
1. Which of the following data types can be used as the Selector input to a Case
structure?
a. Boolean
b. Integer
c. String
d. Array
e. Enum
f. Error wire
2. Identify the correct labels with the components marked in the following diagram.
a. Input tunnel
b. Case Selector
c. Output tunnel
d. Selector label
Copyright 2020 National Instruments
Lesson 9 Executing Code Based on a Condition
9-20 | ni.com
```
Activity: Lesson Review – Answers
```
1. Which of the following data types can be used as the Selector input to a Case
Structure?
a. Boolean
b. Integer
c. String
d. Array
e. Enum
f. Error wire
2. Identify the correct labels with the components marked in the following diagram.
a. Input tunnel - 3
b. Case Selector - 2
c. Output tunnel - 4
d. Selector label - 1
Copyright 2020 National Instruments
10
Writing and
Reading Data to
a File
In this lesson, you explore how to write data to file and
read data from file.
Topics
- Writing Data to Text File
- Writing Multi-Channel Data to Text File
- Creating File and Folder Paths
- Analyzing Data in Text File
- Comparing File Formats
Exercises
Exercise 10-1 Using High-Level I/O VIs/Functions
Exercise 10-2 Using Low-Level File I/O VIs/Functions to Stream Data
to a Text File
Exercise 10-3 Streaming an N-Channel Acquisition Data to a Text File
Exercise 10-4 Programmatically Creating Filenames Based on a
Current Timestamp
Exercise 10-5 Reading and Analyzing Data From a File in LabVIEW
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-3
A. Writing Data to Text File
This section discusses the basics of writing data to a text file.
Typical File I/O Operations
When accessing files in LabVIEW, there is a typical file I/O programming flow.
1. First, you will open or create or replace the file.
2. Second, you will read or write to the file.
3. Third, you will close the file when finished.
4. And finally, you will check if an error has occurred.
High-Level and Low-Level File I/O Nodes
High-Level File I/O
```
High-level file I/O VIs combine three steps (open, read or write, and close) all in one
```
node. For example, executing the Write Delimited Spreadsheet VI will open a file, write
data to the file, and close the file.
High-Level File I/O Nodes Low-Level File I/O Nodes
Perform three steps of the file I/O process
```
(open/write/close).
```
Perform one step of the file I/O process.
Simplify the block diagram. Provide finer control of file access.
Create unnecessary resource overhead when used
in loops.
Save memory resources when used in
loops.
Are good to use when writing to a file in a single
operation.
Are good to use when streaming data to
disk.
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-4 | ni.com
In the following example the DAQmx Read VI acquires multiple samples from 4 channels and outputs the data as a 2D DBL array.The Write Delimited Spreadsheet VI opens or creates the file specified by the Data log filepath control and then writes a header containingeach channel name.
¬The Write Delimited Spreadsheet VI inserts a tab delimiter between each column item and inserts a new line character
at the end of each row. Lastly, the Write Delimited Spreadsheet
¬ ¬
VI closes the file.
Next, the Write Delimited Spreadsheet
¬ VI opens the same file and then writes the 2D DBL array data to the file.
¬Notice that Append to File
terminal
¬ is set to TRUE, which means this VI will not overwrite the headers written by the previous Write Delimited Spreadsheet VI.
Notice that the VI had to first transpose the 2D array to make each column represent a channel.
¬Again, the Write Delimited Spreadsheet VI
inserts a tab delimiter between each column element and a new line character at the end of each row.
¬Lastly, the VI closes the file.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-5
Exercise 10-1: Using High-Level I/O VIs/Functions
Goal
Use high-level file I/O VIs and functions to write an array of acquisition data to a file.
Hardware Setup
• BNC-2120—Set up the Temperature Reference, Thermocouple, and Sine Wave
```
Function & TTL Square Wave Function inputs (ai0:3).
```
• Simulated—Set up ai0:3 of an analog input module.
Instructions
Finite Acquisition ofN Channels andN Samples
1. Open the following project: C:\Exercises\LabVIEW Core 1\
High-Level Write to File\High-Level Write to Text File.lvproj.
2. From the Project Explorer window, open the High-Level Write to Text File –
N-Channel VI.
3. Examine the VI.
Notice that the DAQmx Read VI is configured to read multiple samples from
multiple channels as a 2D DBL array.
Notice that the DAQmx Timing VI configures this VI to perform a finite
```
acquisition ofN samples per channel (Number of Samples control) at a defined
```
```
sample rate (Sample Rate control).
```
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-6 | ni.com
4. Modify the block diagram, as shown in the following figures, to write the
acquisition data to a file.
1 Write Delimited Spreadsheet VI—Use the first Write Delimited Spreadsheet VI to
write the header to the file. Place the VI on the block diagram.
2 Right-click the file path input and select Create Control. Rename the control Data
log filepath.
3 String Array Constant—Place an Array Constant on the block diagram. Create a
String Constant and drag it into the Array Constant, which changes the Array
Constant to a string array constant. Right-click the array index, select Properties»
Size, and set Dimensions to 2. Resize the constant and set the values in the first
row, as shown. Wire the constant to the 2D data input of the Write Delimited
Spreadsheet VI, which will adapt to the 2D string array data type.
4 Notice that the append to file input is unwired, so it will default to False. This
means that if a text file already exists at the data log file path, this VI will
overwrite any data in that file.
3 2 1
4
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-7
Configure the Data log filepath control.
– Switch to the front panel.
– Right-click the Data log filepath control and select Properties.
– In the Browse Options tab set Selection Mode as shown in the figure
below. This allows the user to browse to a new or existing file path where
the user wants to save the log file.
– Set Pattern Label to Text file.
– Set Pattern to *txt.
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-8 | ni.com
Refer to the following figure to transpose the 2D array to represent data by
column instead of row and write numeric data to the file.
1 Transpose 2D Array function—Use this function to transpose the 2D array so that
each channel’s data is represented by a column instead of a row. In this exercise,
this is how we want the spreadsheet file to show the data.
2 Write Delimited Spreadsheet VI—use the second Write Delimited Spreadsheet VI
to write the numeric data to the file.
The previous Write Delimited Spreadsheet VI adds headers to the text file, and
this Write Delimited Spreadsheet VI appends data to the file after the headers.
3 Wire the file path terminals between the two Write Delimited Spreadsheet VIs, as
shown in the figure. This tells the second VI to write to the same file as the first
VI.
1
3 2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-9
5.

Complete the wiring as shown in the following figure.
6.

Create the text file.
On the front panel, set the
Physical Channel
control to the following value:
```
(BNC-2120/Simulated Hardware)
```
PCI-6221/ai0:3
On the front panel, click the
…
button of the
Data log filepath
control. In the
Save As
dialog box, set the file path to
```
C:\Exercises\LabVIEW Core 1\High-Level Write to File\Finite Acquisition Data.txt.Run the VI.Copyright 2020 National Instruments
```
Lesson 10 Writing and Reading Data to a File
10-10 | ni.com
7. Explore the text file created by this VI.
In Windows Explorer, navigate to the data log file and double-click it to view
the contents.
Notice the file includes a header describing each channel.
Verify that the log file looks similar to the following figure.
Try opening the text file using Microsoft Excel. Verify that the log file looks
similar to the following figure.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-11
Your Turn
1. Use the LabVIEW Help to learn more about each node.
2. Experiment with the VI to better understand its functionality. For example:
What is the effect on the log file if you modify the values in the 2D string array
for the header text?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
What is the effect on the log file if you remove the Transpose 2D array
function?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
What is the effect on the VI if you remove the filepath input of the first Write
Delimited Spreadsheet VI?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
On the Job
1. Do any of your applications require logging data from anN-channelN-sample finite
acquisition?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
2. If so, how many channels? ______________
How many samples per channel? ________________
List the column header names below.
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
End of Exercise 10-1
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-12 | ni.com
Low-Level File I/O
Use low-level file I/O functions when you need to control each step. Low-level file I/O
functions provide individual nodes for each step.
In the example VI, the first function opens an ASCII text file, then another function
writes to that file repeatedly in a loop. Then the last function closes the file. As you
can see, the Write to Text File function might be called hundreds of times, but the
Open File and Close File functions only happen one time.
If you need to write or read multiple times to the same file, you should use low-level
functions for better performance.
In contrast, if you use a high-level VIs inside a loop, it will open, modify, and close the
file every time the loop executes, which will result in worse performance.
Low-Level File I/O—File Reference
Reference numbers are temporary pointers to a resource, such as a file, device, or
object. References serve as unique identifiers of that object.
A reference is created when the user opens or creates a file. In the example in the
following figure, the reference is wired to each file I/O function. The reference
identifies which file the Write to Text File function and the Close File function should
access.
Low-Level File I/O—Streaming Numeric Data to Text File
If you want to stream, or continuously write numeric data to a file, you should use the
low-level file I/O functions.¬
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-13
A common example of this is streaming your acquired data to file.
When writing numeric data to a text file, you must first convert the numeric data type
to a string data type because the Write to Text File function’s text input is a string
data type.
Convert Data Types to Text
One way to convert numeric data to a string is by using the Numeric Conversion
functions.
The following example converts the floating-point numeric by using the Number to
Fractional String function. The precision input specifies the number of digits after the
decimal point in the output string. In this case, three digits after the decimal point. You
can see that the floating-point data type has been converted to a string of “0.897”.
Convert Data Types to Text—Format Into String Function
What if you have several items and data types to convert into a single resulting string?
You can use a single Format into String function to perform this conversion. The
Format into String function requires some practice to use, but it is very useful for
conversions into strings.Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-14 | ni.com
The following example uses the Format into String function to convert three items into
a string: Username, Sample Rate, and Number of Samples.
The format string input is a string that includes a format specifier for each input along
with any additional text that you want to appear in the output. A format specifier is a
series of characters, initiated by a %, that indicates how to convert the associated
input argument into text.
• %s—string input
• %.3f—floating-point input that will appear with a fractional format, with a
precision of 3 digits after the decimal point, in the resulting string
• %d—signed decimal integer input
For more information on using this function and format specifiers, refer to the
LabVIEW Help topic for the Format Into String function.
```
Demonstration: Converting to String Data Type
```
Low-Level File I/O—1Chan1Samp Example
This example shows how to stream 1 channel 1 sample data in a loop.
1. First we create a file.
2. Then, we write a header to the file by writing a descriptive name for the data and
an end-of-line character.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-15
3.

Then in the loop, we acquire one sample each iteration, use the Format into String function to convert the numeric into a string and addan end-of-line character.
¬
4.

Then write the resulting string to the text file. This happens in every loop iteration until the user clicks the
Stop
button.
5.

Lastly, after we exit the loop, we close the file.
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-16 | ni.com
Exercise 10-2: Using Low-Level File I/O
VIs/Functions to Stream Data to a Text
File
Goal
Stream single channel, single sample temperature data to text file.
Instructions
1. Open the following project: C:\Exercises\LabVIEW Core 1\
```
Low-Level Stream to Text File (1Chan 1Samp)\Low-Level Stream to Text
```
```
File (1Chan 1Samp).lvproj.
```
2. From the Project Explorer window, open the Stream to Text File — 1 channel 1
sample VI.
3. Examine the VI.
Notice that the DAQmx Create Channel VI configures the task to acquire
measurements from a thermocouple.
Notice that the DAQmx Timing VI configures the task to acquire
measurements continuously at a sample rate of 1 Hz.
Notice that the DAQmx Read VI reads 1 sample from 1 channel as a single
DBL data type.
Question 1 - How frequently does the While Loop execute? _________ times per
second.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-17
4.

Modify the block diagram, as shown in the following figure, to stream data to a text file.
5.

Save the VI.
6.

Run the VI.
On the front panel, set the
Thermocouple Channel
```
control to a single thermocouple channel on your DAQ device (e.g. PCI-6221/ai1).
```
Click the
Run
button.
1
Open/Create/Replace File
function
—Specify the filepath of the data log file. In this exercise, leave the file path input unwired so that
when the user runs this VI, this function will launch a file dialog box for the user to choose the file path for the data log file.
2
Concatenate Strings function
—Use this function to create the header string with an End of Line constant.
3
Write to Text File function
—Use the first Write to Text File function to write the header to the first line of the file before the VI enters
the While Loop.
4
Format Into String function
—Use this function to convert the numeric DBL data into a string data type because the Write to Text File
```
function requires a string input.This function, as configured in this exercise (formating string syntax is
```
```
“%.3f%s”)
```
, will format a DBL input of 5.123456789 into the
string “5.123<end-of-line character>”. Refer to the
LabVIEW Help for more details on this function and the format string syntax.
5
Write to Text File function
—Use the second Write to Text File function to continuously write data to file inside the While Loop.
6
Close File fucntion
—Closes the file. You should always close a file when you are done accessing the file in the VI.
1
2
3
4
6
5
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-18 | ni.com
Save the file as C:\Exercises\LabVIEW Core 1\Low-Level Stream to
```
Text File (1Chan 1Samp)\Stream Data (1Chan 1Samp).txt.
```
Let the VI run for about 10 seconds, so the VI can acquire and log
approximately 10 temperature measurements.
Click the Stop button.
7. Explore the text file.
In Windows Explorer, navigate to and double-click the data log file to view its
contents.
Notice the file includes a header describing each channel.
Verify that the log file looks similar to the following figure.
8. Try opening the text file using Microsoft Excel.
Your Turn
```
Create a log file with two column headers (“Current Temperature (deg C)”,
```
```
“Current Temperature (deg F)”) and two columns of data.
```
Answers
Question 1 - Answer: The While Loop executes 1 time per second. The DAQmx
Read VI reads one sample each iteration. The sample rate is 1 Hz, so the DAQ
device acquires 1 sample per second. Therefore, the While Loop only executes one
time per second because the DAQmx Read VI must wait until a sample is available
to read.
End of Exercise 10-2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-19
B. Writing Multi-Channel Data to Text FileIn this section, we will learn how to write multi-channel data to a text file.N Channels, 1 Sample Streaming ExampleThis example shows how to stream N channels, 1 sample data in a loop.1.

First, we create a file using the Open/Create/Replace File function.
2.

Then we write the column headers to the file. The string array constant contains the column headers. The Array to Spreadsheet Stringfunction converts the array into a single string that contains each string in the array, separated by a tab, and adds an end-of-line characterat the end. Then, we write this string to file to create the header using the first Write to Text File function.
3.

Then in every loop iteration, we acquire a 1D array containing one sample from each channel and use the Array to Spreadsheet Stringfunction to convert the numeric array into a single string that contains each numeric separated by a tab with an end-of-line character atthe end of the string.
4.

Then, we write this to the text file. This happens in every loop iteration until the user clicks the
Stop
button.
5.

Lastly, we exit the loop, and close the file.
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-20 | ni.com
N Channels,
N Samples Streaming Example
This example shows how to stream
N channels,
N samples data in a loop.
1.

First, we create a file using the Open/Create/Replace File function.
2.

Then we write the column headers to the file. The string array constant contains the column headers. The Array to Spreadsheet Stringfunction converts the array into a single string that contains each string in the array, separated by a tab, and adds an end-of-line characterat the end. Then, we write this string to file to create the header using the first Write to Text File function.
3.

Next, in every loop iteration, we acquire a 2D array containing multiple samples from each channel and use the Transpose 2D Arrayfunction so that each channel’s data is represented by a column instead of row.
4.

Then, we use the Array to Spreadsheet String function to convert the 2D numeric array into a single string that contains each columnitem separated by a tab character and each row separated by an end-of-line character.
5.

Then, we write this string to the text file. This happens in every loop iteration until the user clicks the
Stop
button.
6.

Lastly, we exit the loop, and close the file.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-21
Exercise 10-3: Streaming anN-Channel Acquisition
Data to a Text File
Goal
Explore examples that streamN channel 1 sample andN channelN sample acquisition
data to a file.
Instructions
```
N Channels, 1 Sample (1D DBL) Streaming Example
```
1. Open the following project: C:\Exercises\LabVIEW Core 1\Low-Level Stream to
```
Text File (NChan)\Low-Level Stream to Text File (NChan).lvproj.
```
2. From the Project Explorer window, open the Low-Level Stream to Text File (NChan
```
1Samp) VI.
```
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-22 | ni.com
3.

Explore the block diagram.The first Array to Spreadsheet String function will create the following result.
1
Array to Spreadsheet String
function
—This function is configured to create a spreadsheet string, which adds a delimiter between each
array element and adds an end-of-line constant at the end of the string. In this VI, it turns the incoming string array into the followingstring:Channel 0<tab> Channel 1<tab> Channel 2<tab> Channel 3<end-of-line>.
2
Array to Spreadsheet String
function
—Use this function to convert the 1D DBL array data into a string data type because the Write to
Text File function requires a string input.
1
2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-23
The second Array to Spreadsheet String function, as configured in this exercise, would
format a 1D DBL input to a spreadsheet string, as shown in the following example.
4. Test the VI.
Run the VI.
In the file dialog box, save the log file as C:\Exercises\LabVIEW Core 1\
```
Low-Level Stream to Text File (NChan)\Stream Data (NChan 1Samp).txt.
```
Click the Stop button after approximately 10 seconds.
In Windows Explorer, open and explore the text file.
5. Use a probe to view wire values to better understand the functionality of the
functions and VIs. You can also create indicators of wires and view the indicator
values on the front panel, if you prefer.
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-24 | ni.com
N Channels,
```
N Samples (2D DBL) Streaming Example
```
1.

From the
Project Explorer
```
window, open the Low-Level Stream to Text File (NChan NSamp)
```
VI.
2.

Explore the block diagram.
The first Array to Spreadsheet String function, as configured in this exercise results in the following output.
1
Array to Spreadsheet String function
—In this VI, the Array to Spreadsheet String function is configured to create a spreadsheet string,
which adds a delimiter between each array element and adds an end-of-line constant at the end of the string. In this example, it turnsthe incoming string array into the following string:Channel 0<tab> Channel 1<tab> Channel 2<tab> Channel 3<end-of-line>.
2
Transpose 2D Array function
—Rearranges the elements of 2D array such that 2D array becomes transposed array.
3
Array to Spreadsheet String function
—Use this function to convert the 2D DBL array data into a string data type because the Write to
Text File function requires a string input.
1
2
3
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-25
The Transpose 2D Array function rearranges the elements of the array, as shown in the following figure.The Second Array to Spreadsheet String function, as configured in this exercise, would format the output of the Transpose 2D Arrayfunction to a spreadsheet string, as shown in the following figure.Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-26 | ni.com
3. Test the VI.
Run the VI.
In the file dialog box, save the log file as C:\Exercises\LabVIEW Core 1\
```
Low-Level Stream to Text File (NChan)\Stream Data (NChan NSamp).txt.
```
Click the Stop button after approximately 10 seconds.
In Windows Explorer, open and explore the text file.
4. Use a probe to view wire values to better understand the functionality of the
functions and VIs. You can also create indicators of wires and view the indicator
values on the front panel, if you prefer.
On the Job
Answer the following questions for your own applications.
1. Do you need to continuously stream multi-channel data to a text file?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
2. If so, which of the above examples is closest to meeting your needs?
```
N Channels, 1 Sample (1D DBL) Streaming Example
```
OR
```
N Channels,N Samples (2D DBL) Streaming Example
```
3. What modifications do you need to make to these examples to meet your needs?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 10-3
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-27
C. Creating File and Folder Paths
In this section, we will learn how to programmatically create file and folder paths.
Methods of Creating File and Folder Paths
Hard-Coded Paths
The first method of creating a file or folder path is to specify a hard-coded, absolute
filepath, as shown in this filepath constant in the figure below.
An absolute filepath describes the location of a file or folder starting from the top-level
of the file system, such as the C drive.
File Dialog
Another way to create a filepath is to use the File Dialog Express VI to launch a file
dialog box¬ asking the user to choose a file themselves.
Relative Paths & Programmatic Creation
You can also create a relative path. A relative path describes the location of a file or
folder relative to another location in the file system.
The Application Directory VI returns the path to the directory containing the LabVIEW
project file. The example in first figure uses this function and the Build Path function
to create a relative path to a MyData.txt file in the same folder as the project file.
The Get System Directory VI returns the system directory specified by its type input.
The example in second figure uses this VI and the Build Path function to create a path
to a MyData.txt file in the user’s Desktop directory on their computer.
For a list of available system directories, refer to the LabVIEW Help.¬
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-28 | ni.com
Using relative paths makes your code more portable from computer to computer.
```
Example: Programmatically Create Filename Based on Time/Date
```
This common real-world example programmatically creates a filename based on the
current date and time.
The Format Date and Time String function uses the current time as the default
timestamp. The Format Date and Time String function then converts the timestamp
into a string based on its time format string input.
In the following example, the function converts the timestamp into a string starting
with the year, then month, day, an underscore character, hour, minute, second,
another underscore character, and then MyData.txt.
This example uses the Application Directory VI and Build Path function to make this
into a relative filepath in the same directory as the project file.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-29
Exercise 10-4: Programmatically Creating Filenames
Based on a Current Timestamp
Goal
Explore example code that programmatically creates filenames based on the current
date and time.
Examine Code to Generate a Timestamped Filename in
Relative Path
1. Open the following project: C:\Exercises\LabVIEW Core 1\
Timestamped Filepath\Timestamped Filenames.lvproj.
2. From the Project Explorer window, open the Generate Timestamped Filepath VI.
3. Examine the block diagram.
Refer to theLabVIEW Help for how to use the time format string input.
1 Format Date/Time String function—Converts a timestamp of the current time or
numeric value into a string that displays the corresponding time. Using the time
format string in this block diagram, this function will return a string similar to the
```
following:
```
<year><month><day>_<hour><minute><second>_Acquired Data.txt
```
Example: 201901014_101530_Acquired Data.txt
```
2 Application Directory VI—Returns the path to the directory containing the current
```
project (.lvproj).
```
3 Build Path function—Creates a new path by appending a filename or relative path
to an existing path. In this VI, the output of this function will be a timestamped
```
filename in the directory containing the current project. (For example,
```
```
C:\Exercises\LabVIEW Core 1\Timestamped Filepath\
```
```
20170601_101530_Acquired Data.txt)
```
2
1
3
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-30 | ni.com
4.

Test the code.
```
Run the VI multiple times.On the front panel, notice that the generated filename changes to match the current date and time.Notice that the filepath directory is the same as the directory containing the current project file (
```
.lvproj
```
).
```
##### Examine Timestamped Filename Code in a Data Logging VI1.

From the
Project Explorer
window, open the [Timestamped File] High-Level Write to Text File
VI.
2.

Examine the block diagram. Notice how the timestamped filename code passes the timestamped filepath to the
file path
input of the file
Write Delimited Spreadsheet VI.
3.

Test the VI.
Run the VI.Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-31
Navigate to the log file in the C:\Exercises\LabVIEW Core 1\Timestamped
Filepath directory.
Notice that the filename indicates the date/time when the VI created that file.
Run the VI a couple more times.
Examine the additional log files that the VI generated in the
```
C:\Exercises\LabVIEW Core 1\Timestamped Filepath directory.
```
Notice that their filenames also indicate the date/time when the VI created
those files.
Your Turn
Modify the VI so that the VI creates a timestamped filename that looks similar to the
following format and saves the file in the C:\Exercises\LabVIEW Core 1\
Timestamped File directory.
<year><month><day>_<hour><minute><second>_<your own custom filename>
```
Example: 20190511_090030_Batch ABC.txt
```
On the Job
Would any of your applications benefit from creating a new timestamped filename
every time you run your VI?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 10-4
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-32 | ni.com
D. Analyzing Data in Text File
In this section, we will show how to read and analyze data in a text file.
Let’s say you have already collected and stored all your data in a text file. Now, you
want to analyze and process that data. This type of processing is called offline
processing because you have already finished acquiring all the data.
```
Offline Processing Option 1: Use Your Preferred Tool(s)
```
A delimited text file is a common human-readable format.
Many text editors, spreadsheet editors, and analysis tools can read and process a
delimited text file, so you can use your preferred tool for viewing and analyzing the
data in this type of file.
For example, you could view, analyze, and process a delimited text file using Microsoft
Excel.
Offline Processing Option 2: Use LabVIEW
You can also use LabVIEW to easily read data contained in a delimited text file and
use built-in analysis functions and your own custom logic to process the data.
To do this, use a Read Delimited Spreadsheet VI and Array Subset function to extract
the data from the 2nd line to the last line as a 2D numeric array.
You can then process the 2D numeric array. For example, you can transpose it, search
its elements, run algorithms on its data, and more.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-33
Exercise 10-5: Reading and Analyzing Data From a
File in LabVIEW
Goal
Read and analyze data from a text file in LabVIEW.
Instructions
1. Examine the text file containing the data that we want to read into LabVIEW.
Open and examine the following text file: C:\Exercises\LabVIEW Core 1\
```
Read Delimited File\Acquired Data (NChan NSamp).txt.
```
Notice that the first row is a header.
Notice that the text file contains 4 columns of data. Each column represents
a different channel.
2. Open the following project: C:\Exercises\LabVIEW Core 1\Read Delimited
File\
Read Delimited File into VI.lvproj.
3. From the Project Explorer window, open the Read Delimited File into VI.
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-34 | ni.com
4.

Examine the block diagram.
Note

If you wire a 2D DBL array to a graph, the graph will interpret each row of the 2D DBL array as a separate plot, which is
why you must transpose the 2D array in this VI.
1
Application Directory VI
```
—Returns the path to the directory containing the current project (
```
.lvproj
```
)
```
2
File Dialog Express VI
—Displays a dialog box with which a user can specify the path to a new or existing file or directory.
3
```
Read Delimited Spreadsheet VI (string)
```
—Returns the contents of the delimited text file as a 2D string array.
4
Index Array function
—Extracts the first row, which contains a string for each column header.
5
```
Read Delimited Spreadsheet VI (DBL)
```
—Returns the contents of the delimited text file as a 2D DBL array.
6
Array Subset function
—The first line in this tab-delimited text file is a header. Use this function to remove the first line, so that the array
output contains only the numeric data.
7
Transpose 2D Array function
—Transposes the 2D array. The output 2D array contains one row for every channel.
1
2
3
5
4
6
7
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-35
5.

Examine the functionality of the VI.
Run the VI.In the file dialog box, navigate to the following text file:
```
C:\Exercises\LabVIEW Core 1\Read Delimited File\Acquired Data
```
```
(NChan NSamp).txt
```
.
Use Highlight Execution and probes to examine the functionality of this VI.
##### Your Turn1.

Open and examine the following text file:
```
C:\Exercises\LabVIEW Core 1\Read Delimited File\Acquired Data (NChan NSamp).txt
```
.
2.

Modify the block diagram to process the multi-channel data that this VI has read from the text file.
Display the minimum and maximum values of each channel.Your front panel should look similar to the following figure.
End of Exercise 10-5
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-36 | ni.com
E. Comparing File Formats
In this section, we will quickly compare file formats.
Common Log File Formats
There are three common file types that you might work with in LabVIEW:
```
• Text (ASCII) files
```
• TDMS files
• Binary files
Text files are the easiest format to use and share, as many applications, such as
notepad and Microsoft Excel, can read from or write to a text file. Data is represented
as strings in text files.
TDMS is a binary file format created by NI that is optimized for saving measurement
data to file. You can use TDMS files to organize data and store information about your
data. You can also use TDMS files to write and read data at high speeds. You can also
use an add-in to view TDMS files in Microsoft Excel.
Binary is a file format that you can use when you want to write to or read from a binary
file with a specific binary format.
Below is a table comparing the three file formats.
Next Steps
To continue learning more about I/O, go to theAdvanced File I/O Techniques lesson.
Topics include:
• File formats
• Access TDMS files in LabVIEW and Excel
• Write and read binary files
```
Text (ASCII) Binary TDMS
```
Human readable X
Small disk footprint X X
High-speed streaming X X
Searchable X
Inherent attributes X
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 10-37
```
Activity: Lesson Review
```
1. After opening a file, which output does the Open/Create/Replace File function
return?
a. Filepath
b. Filename
c. Reference out
d. Task out
2. Which of the following opens a file using the relative path of the directory
containing the current VI?
3. Which file format is best used in an application that requires high-speed streaming
and searchable data?
a. Text (ASCII)
b. Binary
c. TDMS
Copyright 2020 National Instruments
Lesson 10 Writing and Reading Data to a File
10-38 | ni.com
```
Activity: Lesson Review – Answers
```
1. After opening a file, which output does the Open/Create/Replace File function
return?
a. Filepath
b. Filename
c. Reference out
d. Task out
2. Which of the following opens a file using the relative path of the directory
containing the current VI?
3. Which file format is best used in an application that requires high-speed streaming
and searchable data?
a. Text (ASCII)
b. Binary
c. TDMS
Copyright 2020 National Instruments
11
Reusing Code
In this lesson, you learn to recognize the benefits of
reusing code and create a subVI with a properly configured
connector pane, meaningful icon, documentation, and
error handling.
Topics
A. Understanding Modularity
B. Working With Icons
C. Configuring the Connector Pane
D. Working With SubVIs
E. Call SubVIs
Exercises
Exercise 11-1 Creating and Using a SubVI
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 11-3
A. Understanding ModularityFirst, we will discuss the high-level benefits of code reuse and how to identify code that should be converted into a subVI.Modularity and SubVIsModular code implements the functionality of an application in units that are independent of one another so that any changes that you maketo a given module will require minimal changes to your other modules.SubVIs—Reusing CodeSubVIs are similar to the subroutine in text-based programming languages. Use subVIs when you have code that performs identical operations on differentparts of your block diagram or in another VI.Modularity

The degree to which a program is composed of discrete modules such that a change to one module has minimal impact on othermodules.
##### SubVI

A VI used within another VI. Modules in LabVIEW are called subVIs.
Copyright 2020 National Instruments
Lesson 11 Reusing Code
11-4 | ni.com
Convert a Section of a VI to a SubVI
To convert a section of a VI into a subVI:
a. Select the section of the block diagram to reuse.
a. Select Edit»Create SubVI.
Reusing Code Example
The following pseudo-code and block diagrams demonstrate the analogy between subVIs and
subroutines.
```
Demonstration: How do I create a subVI from the existing
```
code?
Function Code Calling Program Code
```
function average (in1, in2, out)
```
```
{
```
```
out = (in1 + in2)/2.0;
```
```
}
```
main
```
{
```
```
average (point1, point2, pointavg)
```
```
}
```
SubVI Block Diagram Calling VI Block Diagram
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 11-5
B. Working With IconsNow let’s take a closer look at creating icons for your subVIs.Purpose of IconThe icon for a VI helps you to identify it on the block diagram of another VI.Characteristics of a Good IconYou should create a meaningful icon for every VI.SubVIs with the well-defined icons convey more information about their purpose and reduce the need for additional documentation. Youshould avoid using idioms and colloquialisms when creating your icons, because they may not translate well to other languages.For example, do not represent a data logging VI with a picture of a tree branch or a lumberjack.Icon

A VI icon is a graphical representation of a VI. It can contain text, images, or a combination of both. If you use a VI as a subVI, the iconidentifies the subVI on the block diagram of the calling VI.
1
Icons
1
Bad Icon
2
Good Icon
1
1
2
Copyright 2020 National Instruments
Lesson 11 Reusing Code
11-6 | ni.com
Creating Icons—Icon Editor
Create icons using the Icon Editor dialog box. Alternatively, you can drag a graphic
file, such as a .bmp or .jpg, from your file system to the icon in the upper-right corner
of the VI.
```
Demonstration: Creating an Icon
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 11-7
C. Configuring the Connector Pane
Now let’s take a closer look at creating connector panes for your subVIs.
Connector Pane
The connector pane defines the inputs and outputs you can wire to the VI so you can
use it in subVI.
The subVI receives data from the calling VI at its inputs, passes the data to the block
diagram, and sends the results back to the calling VI through its outputs.
The Connector Pane is displayed next to the icon.¬ You can select a template from
different patterns.¬
To assign a terminal, click the connector pane terminal and then select the front panel
control or indicator.
Copyright 2020 National Instruments
Lesson 11 Reusing Code
11-8 | ni.com
Assigning Terminals
In general, inputs are on the left and outputs are on the right. Top and bottom
terminals are flexible and can be used for both, typically after the left or the right
columns are fully used.
If your front panel includes more terminals than this, you should consider modifying
your code.
Use the following guidelines when assigning connector pane terminals:
• References on the top
• Error clusters on the bottom
• Inputs on the left
• Outputs on the right
• Unused terminals can be assigned later if you modify the VI
• When assigning terminals, consider how the VIs will be wired together
Terminal Settings
You can also designate which inputs are Required, Recommended, and Optional to
prevent users from forgetting to wire necessary subVI terminals.
• Required means that the block diagram on which you place the subVI will be
broken if you do not wire those inputs.
– Set a terminal setting to required only if the VI must have the input or
output to run properly.
• Recommended means that you should wire that terminal, but it is not critical to
the execution of the VI.
– Most terminals should be Recommended.
– LabVIEW sets inputs and outputs to Recommended by default.
• Use Optional terminals when the default value is sufficient for most use cases.
– For example, inputs where you rarely expect for the developer to change
the value.
– These inputs are often used for settings that are only included for future
scalability.
– Optional terminals are useful if there is a corner use case for the VI.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 11-9
To change a terminal settings, do the following:•
Right-click a terminal in the connector pane and select
This Connection Is
.
•
Select Required, Recommended, or Optional.
```
Demonstration: Configuring the Connector Pane
```
Copyright 2020 National Instruments
Lesson 11 Reusing Code
11-10 | ni.com
D. Working With SubVIsNow let’s discuss the steps that you should take to document your subVIs.VI DescriptionWhen a user places your VI on the block diagram of a VI that they are creating, they may want to learn more about your VI and its terminalswithout having to open and explore it.To create documentation for your VI, select the File»VI Properties, choose Documentation as a Category. Type the description in the VIdescription section.To view a subVI’s description, hover your mouse cursor over the subVI on the block diagram and view the Context Help window.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 11-11
Terminal DescriptionsTo create documentation for a terminal on your VI, select the terminal that you want to document. In the Item tab of the Configuration Pane,enter a description for that control or indicator.To view a subVI terminal description, hover your mouse cursor over the terminal and view the Context Help window.Call SubVIsNow let’s discuss how to use your subVI and common practices for handling errors in subVIs.To place your subVI on the block diagram, drag the subVI from the Project Explorer window, or drag the icon of the open VI to the blockdiagram of the calling VI.
Copyright 2020 National Instruments
Lesson 11 Reusing Code
11-12 | ni.com
```
Demonstration: Placing SubVIs on the Block Diagram
```
Error Management in SubVIs
Suppose you have created a subVI that interacts with hardware or performs file I/O.
If an error occurs in the calling VI before your subVI runs, you may not want the subVI
to execute its functionality.
Place a Case Structure around the core functionality and wire the Error In cluster to
the Case Selector.
Move the core functionality of the subVI into the "No Error" case so that it only
executes if the calling VI did not pass an error to the subVI.
For the Error case, pass appropriate values to any subVI outputs.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 11-13
Code that you develop as a top-level VI may one day be used as a subVI. This is a
great reuse of code, but you may have made design decisions that were appropriate
for that VI as a top-level VI, but not as a subVI.
For example, you may have placed a Simple Error Handler VI on the block diagram.
This VI displays error information to the end user and should really only exist in the
top-level VI.
For your subVIs, you should instead pass the error cluster out so that the calling VI
can handle the error.
In this example, the main VI generates a waveform from a database. Because complex
waveform configuration is resource consuming, this application uses a subVI to
perform the waveform generation from a database based on the provided ID.
Copyright 2020 National Instruments
Lesson 11 Reusing Code
11-14 | ni.com
Exercise 11-1: Creating and Using a SubVI
Goal
Create the icon and connector pane for a VI so that you can use the VI as a subVI.
Scenario
You will explore a VI that generates a timestamped file path in the same directory
containing the project. Create an icon and a connector pane so that you can use this
VI as a subVI.
Design
The Generate Timestamped Filepath VI contains the following inputs and outputs.
Creating a SubVI
1. Open C:\Exercises\LabVIEW Core 1\Create SubVI\
Create and Use SubVI.lvproj.
2. From the support folder of the Project Explorer window, open the Generate
Timestamped Filepath VI.
Note It is common practice to place subVIs and support files in a
subdirectory and place the main top-level VI in the parent directory. This
allows the main top-level VI to be more visible and accessible to the user.
Inputs Outputs
Appended filename timestamped relative filepath
Error In Error Out
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 11-15
3.

Place an
Error In
control and
Error Out
indicator on the front panel, as shown in the figure below.
4.

Modify the block diagram, as shown in the following figure.
Drag a
Select
```
function and
```
Path
constant to the block diagram from the Quick Drop menu.
Wire the block diagram as shown in the figure below.Copyright 2020 National Instruments
Lesson 11 Reusing Code
11-16 | ni.com
5. Connect the inputs and outputs to the connector pane, as shown in the following
figure below.
The connector pane is located in the upper-right corner of the front panel.
Click any input or output you want to assign and then click the corresponding
control or indicator on the front panel.
You can change the number of input and output terminals by right-clicking the
connector pane and selecting a suitable connector pane pattern in the Patterns
shortcut menu.
Right-click the appended filename input terminal and select This Connection
Is»Required from the shortcut menu.
Now when you use this subVI in a main VI, the Run button of the main VI will
be broken until the appended filename input terminal is wired.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 11-17
6. Create an icon, as shown in the figure below.
Double-click the VI icon in the upper-right corner of the front panel to open the
Icon Editor. Search for delay and path and place the corresponding graphics
onto the VI icon.
Click the OK button when finished.
7. Create a description for the subVI.
Click File in the upper-left corner of the VI and select VI Properties.
Select Documentation from the Category pull-down menu and enter the
following description: Generates a timestamped filepath with an appended
user-specified name and the same directory containing the project.
Click OK.
8. Save the VI.
9. Test the VI when Error In contains no error.
On the front panel, set the appended filename control to a string value, such
as MyData.
Verify that the Error In control has a status of False.
Run the VI.
Notice that the VI returns a timestamped relative file path similar to
```
C:\Exercises\LabVIEW Core 1\Create SubVI\
```
20190509_093000_MyData.txt.
10. Test the VI when Error In contains an error.
Set the status element of the Error In control to TRUE. Set the code element
to -1.
Run the VI.
Copyright 2020 National Instruments
Lesson 11 Reusing Code
11-18 | ni.com
Notice that the VI returns an empty path in the timestamped relative filepath
indicator. Notice that the error information is passed to the Error Out indicator.
Use the SubVI in a Main VI
1. From the Project Explorer window, open the Main VI.
2. Examine the Open/Create/Replace File function on the block diagram.
Notice that its file path input is unwired, which means when you run the VI, this
```
function will launch a file dialog for you to specify the file path.
```
3. Use the Generate Timestamped Filepath subVI to output a timestamped filename
```
in the same directory as the current project file (.lvproj).
```
Drag the Generate Timestamped File VI from the Project Explorer window to
the block diagram of the Main VI.
Right-click the appended filename input and select Create Constant. Set the
constant to string value, such as MyData.
Wire the timestamped relative filepath output of the Generate Timestamped
Filepath VI to the Open/Create/Replace File function.
4. View the subVI description.
Open the Context Help window by pressing <Ctrl-H>.
Hover your mouse cursor over your subVI. Notice that the Context Help
window populates with the text that you previously entered for the subVI’s VI
Description.
5. Examine the behavior of the VI.
Set the Thermocouple Channel to an appropriate channel.
Run the VI. After a few seconds, stop the VI.
In Windows Explorer, go to the C:\Exercises\...\Create and Use SubVI
directory and notice the timestamped file created by the VI.
Run the VI a couple more times. Notice the additional timestamped files
created by the VI.
6. Now you can reuse the Generate Timestamped Filepath subVI in other VIs where
you want the same functionality.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 11-19
Your TurnCreate a subVI that reads a temperature measurement, compares it to the set temperature threshold, and returns if the threshold is exceededor not.The following figure shows how your completed Temperature Warning subVI could be used in an example VI.
Note

For the answer, refer to the
```
C:\Solutions\LabVIEW Core 1\11-1\[Your Turn] Create SubVI
```
directory.
```
On the JobIs there code you will commonly reuse in your applications? Would the application benefit from putting that code in a subVI?_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________ ___________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________ __________________________________________________________________________________________________________________________________________________Do you have any code that uses a lot of nodes but accomplishes one modular task (for example, algorithm)? Would the top-level applicationbe more readable if that code was put inside a subVI?_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________ ___________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________ __________________________________________________________________________________________________________________________________________________End of Exercise 11-1
```
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 11-21
```
Activity: Lesson Review
```
1. On a subVI, which terminal setting causes a broken VI if the terminal is not wired?
a. Required
b. Recommended
c. Optional
2. You must create a custom icon to use a VI as a subVI.
a. True
b. False
Copyright 2020 National Instruments
Lesson 11 Reusing Code
11-22 | ni.com
```
Activity: Lesson Review – Answers
```
1. On a subVI, which terminal setting causes a broken VI if the terminal is not wired?
a. Required
b. Recommended
c. Optional
2. You must create a custom icon to use a VI as a subVI.
a. True
b. False
You do not need to create a custom icon to use a VI as a subVI, but it is highly
recommended to increase the readability of your code.
Copyright 2020 National Instruments
12
Grouping Data
of Mixed Data
Types
In this lesson, you learn how to create and use clusters to
group data of mixed types.
Topics
A. Understanding Clusters and Their Usage
B. Creating and Accessing Clusters
C. Using Clusters to Plot Data
Exercises
Exercise 12-1Grouping Related Data Using a Cluster
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 12-3
A. Understanding Clusters and Their Usage
In this lesson, we will discuss the creation and use of clusters to group data of mixed
types.
Clusters
A cluster allows you to combine related data elements of different types into a single
data type. Clusters can be used for elements with identical data types when you need
to name individual items.
The figure shows a cluster that combines information that all relates to weather data.
A cluster is functionally similar to a record or struct in text-based programming
languages.
Most clusters on the block diagram have a pink wire and data type terminal.
It is possible to access the individual data elements that are stored within a cluster.
Cluster Array
• Mixed data types
• Fixed size
• One data type
• Vary in sizeCopyright 2020 National Instruments
Lesson 12 Grouping Data of Mixed Data Types
12-4 | ni.com
Clusters and arrays are similar in that you can use both to collect related data into a
single data type.
There are two key differences between these data types.
1. Clusters allow you to combine data of different types, whereas an array can only
contain one data type.
2. Clusters contain the number of elements that you add when you create the cluster.
The number of elements in an array can be programmatically modified at any time.
Reasons to Use Clusters
Now that we understand what a cluster is, let’s discuss why you should use them.
Clusters help to improve data organization both on your front panel and on your block
diagram.
On the front panel, the cluster ensures that you never accidentally separate related
controls or indicators. The cluster border visually indicates that these items are related
to each other.
On the block diagram, instead of having a separate terminal for each data element, the
cluster is shown as a single terminal. This enables you to keep the data together when
passing it into other VIs on your block diagram.
Clusters that only contain numeric values have a brown wire and data type terminal.
You can wire numeric clusters to Numeric functions to perform the same operation
simultaneously on all elements of the cluster.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 12-5
Bundling several data elements into clusters eliminates wire clutter on the block diagram and reduces inputs and outputs for your subVIs.
Copyright 2020 National Instruments
Lesson 12 Grouping Data of Mixed Data Types
12-6 | ni.com
B. Creating and Accessing Clusters
Now that you know why you should use clusters, we will discuss how to create them
on your front panels and block diagrams.
```
Demonstration: Creating a Cluster Control
```
Cluster Order
The cluster order is analogous to the index of elements in an array. If you wire two
clusters together, corresponding elements, determined by the cluster order, must have
compatible data types.
The default cluster order corresponds to the order in which you added each element
to the cluster. If you delete an element, the order adjusts automatically.
You can change the cluster order by right-clicking and selecting the Reorder Controls
In Cluster option.
Arrange Elements in Clusters
When you create a cluster, the data elements will probably not be evenly spaced or
aligned in the cluster.
Select AutoSizing from the menu to automatically resize and rearrange the cluster.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 12-7
Read and Write Clusters
Now that you know how to create and configure a cluster, we will discuss how you
can programmatically read and modify cluster data.
Reading or Modifying the Cluster Data
Use unbundle and bundle functions to read and write cluster data.
Use the Unbundle By Name function if all elements in cluster have names.
Use the Unbundle function if some or all cluster elements are unnamed.
Copyright 2020 National Instruments
Lesson 12 Grouping Data of Mixed Data Types
12-8 | ni.com
This example reads the current and maximum temperature values from the weather
data in a cluster and compares them. The VI then writes warning data to the weather
data out cluster.
Make sure you have wired the input cluster terminal of the Bundle and Bundle By Name
functions. If you do not wire this input, the function creates a cluster.
```
Demonstration: Reading and Writing Clusters
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 12-9
Exercise 12-1: Grouping Related Data Using a Cluster
Goal
• Group related data into a new cluster.
• Create a subVI with cluster input/output.
• Pass cluster data into/out of a subVI from a main VI.
Scenario
Group weather-related data into a Weather Data cluster.
Another developer has created a VI that displays temperature warnings. This VI is part
of a temperature weather station project. Your task is to update this VI to use clusters
instead of individual controls/indicators for inputs and outputs.
Instructions
Determine Warnings SubVI
In this section, you will create a subVI that handles temperature warnings. All the
weather-related data is grouped together in a Weather Data cluster.
1. Open C:\Exercises\LabVIEW Core 1\Clusters\Weather Warning Cluster\
Weather Warnings.lvproj.
2. From the Project Explorer window, open the Determine Warnings VI.
3. Place existing controls and indicators in a cluster named Weather Data, as shown
in the following figure.
1 Cluster—Drop a cluster control from the Data Containers palette and change the
label to Weather Data.
2 Select controls and indicators to include in the cluster. <Shift>-click to select
multiple objects.
3 Drag the controls and indicators into the Weather Data cluster.
2
1
3
Copyright 2020 National Instruments
Lesson 12 Grouping Data of Mixed Data Types
12-10 | ni.com
4. Resize the cluster so that all the elements are visible and arranged vertically, as
shown in the following figure.
5. Reorder the items in the cluster, as shown in the following figure.
1 Autosize cluster—LabVIEW can rearrange and resize the cluster for you.
Right-click the border of the Weather Data cluster and select AutoSizing»Arrange
Vertically.
Right-click the border of the Weather Data cluster and select Reorder Controls In
Cluster. Verify that your Weather Data cluster order matches the order in this
figure.
1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 12-11
6. Modify the VI to receive and return cluster data.
1 Weather Data In—<Ctrl>-click the Weather Data cluster and drag it to create a
copy. Rename the copy Weather Data In.
2 Weather Data Out—Right-click the original Weather Data cluster and select
Change to Indicator. Rename the indicator Weather Data Out.
1 2
Copyright 2020 National Instruments
Lesson 12 Grouping Data of Mixed Data Types
12-12 | ni.com
7.

Modify the block diagram, as shown in the following figure, to extract and modify data from the input cluster.
Note

If the order of the elements in the Unbundle By Name or Bundle By Name functions is different than what you want, you
can click the elements to change the order.
8.

Save the Determine Warnings VI.
Test1.

Enter values in the
Current Temperature
, Max Temperature
and
Min Temperature
controls in the
Weather Data In
cluster.
2.

Run the VI and verify that the
Weather Data Out
indicator displays correct values.
1
Unbundle By Name
—Wire the
Weather Data In
cluster and expand the Unbundle By Name function to display three items. Wire the
outputs of the Unbundle By Name function to the broken wires in the order shown. Because you moved individual controls and indicatorsinto a single cluster, you must use the Unbundle By Name function to access each cluster element.
2
Bundle By Name
—Wire the
Weather Data In
cluster around the analysis code to the input cluster of the Bundle By Name function. Display
two elements and click to select the
Warning?
and
Warning Text
elements. Connect the broken wires to the inputs of Bundle By Name
as shown.
1
2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 12-13
3.

Save and close the VI.
Explore Another VI Using the Weather Data ClusterMain VIIn this section, you explore a full example that uses the Weather Data cluster in multiple places.1.

Open
```
C:\Exercises\LabVIEW Core 1\Clusters\
```
Full Weather Warnings Example\Full Weather Warnings Example.lvproj
.
2.

From the
Project Explorer
window, open the Main
VI.
3.

Examine the block diagram. Notice the following places where the VI uses the Weather Data cluster.
1
Weather Data cluster constant as input to the
Bundle By Name
function.
2
Output of the
Bundle By Name
function.
3
Input and output terminals of the Determine Warnings
subVI.
4
Weather Data indicator.
5
Input of the
Unbundle By Name
function.
6
Input terminal of the Log Warnings
subVI.
1
2
45
3
6
Copyright 2020 National Instruments
Lesson 12 Grouping Data of Mixed Data Types
12-14 | ni.com
Your Turn
Log SubVI
How would you modify the following subVI block diagram to use a cluster instead of
5 individual controls?
Note To view the solution, open the Log Warnings subVI from Full
Weather Warnings Example.lvproj.
On the Job
1. In your own applications, what data should you group into a cluster? Sketch your
potential cluster data types below.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 12-1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 12-15
Error Clusters
Now, that you are familiar with clusters and how to use them, we will take a closer
look at a cluster that you have already used: the error cluster.
An error cluster contains the following elements:
• status
• code
• source
C. Using Clusters to Plot Data
Another special use case for clusters involves plotting data to charts and graphs.
You may encounter a situation where you want to include multiple plots on your chart.
To do this, use a Bundle function to combine a single Y value for each plot into a
cluster, which you can then plot to the chart. Note that this technique only works for
charts.
If you want to combine plots for a graph, you will need to use the Build Array function.
While charts and graphs will probably satisfy most of your needs, you many encounter
situations where you need a different option. To create an XY plot, use the Bundle
```
function to combine the X and Y arrays into a cluster which you can then plot to the
```
XY Graph.
Copyright 2020 National Instruments
Lesson 12 Grouping Data of Mixed Data Types
12-16 | ni.com
Use the Context Help window to determine how to wire multi-plot data to Graphs and
Charts.
```
Demonstration: Visualizing a Cluster Array
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 12-17
```
Activity: Lesson Review
```
1. You have input data representing a circle: x position (I16), y position (I16), and
```
radius (U16). What data type should you use to represent the circle in your
```
application?
a. Three separate controls for the two positions and the radius
b. A cluster containing all of the data
c. An array with three elements
2. What is the data type of the following indicator?
a. Array
b. Cluster
c. 1D array of cluster
d. Cluster containing arrays
Copyright 2020 National Instruments
Lesson 12 Grouping Data of Mixed Data Types
12-18 | ni.com
```
Activity: Lesson Review – Answers
```
1. You have input data representing a circle: x position (I16), y position (I16), and
```
radius (U16). What data type should you use to represent the circle in your
```
application?
a. Three separate controls for the two positions and the radius
b. A cluster containing all of the data
c. An array with three elements
2. What is the data type of the following indicator?
a. Array
b. Cluster
c. 1D array of cluster
d. Cluster containing arrays
Copyright 2020 National Instruments
13
Propagate Data
Type Changes
Using Type
Definitions
In this lesson, you use type definitions to propagate data
type changes throughout an application.
Topics
A. Understanding Type Definition
B. Creating and Applying Type Definition
Exercises
Exercise 13-1 Using a Type Definition
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 13-3
A. Understanding Type Definition
First, let’s discuss the problem that type definitions will help you solve.
Suppose you are working with a cluster that contains weather data and you decide
that you want to add another item to that cluster, as shown in the figure below.
How many places do you have to make this edit? In the block diagram shown in the
following figure, you will need to make edits in the following locations that use the
same cluster:
1. Weather Data constant
2. Weather Data In control inside the Determine Warnings subVI
3. Weather Data Out indicator inside the Determine Warnings subVI
4. Weather Data In control inside the Log Warnings subVI.
5. Weather Data indicator
Copyright 2020 National Instruments
Lesson 13 Propagate Data Type Changes Using Type Definitions
13-4 | ni.com
```
Demonstration: Effects of Changing a Cluster Data Type
```
```
Demonstration: Using Type Definitions
```
To automatically propagate changes to a data type to all instances of that data type,
use a type definition.
B. Creating and Applying Type Definition
Now that you understand the benefits of using Type Definitions, let’s explore how to
create and use them on our front panels and block diagrams.
Choose an Appropriate Custom Control Option
```
LabVIEW has three kinds of custom controls (.ctl files):
```
• A regular custom control is a way to define a UI element that you can easily
use on multiple UIs. For example, the Silver Controls are all .ctl files saved as
Control types. Changes made to one control does not reflect in other controls,
indicators or constants created from the custom control.
• Type definitions and strict type definitions link to all the instances of a custom
control or indicator to a saved custom control or indicator file. You can make
any changes to the data type to all instances of the custom control or indicator
by editing only the saved custom control or indicator file.You can still change
the appearance of individual controls/indicators. This is why clusters and
enumerated data types are type defined, so you can change their data from
one location.
• Strict type definitions apply cosmetic changes too, whereas type definitions
do not.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 13-5
```
Demonstration: Identifying and Creating a Type Definition
```
• To create a Type Definition from an existing control or indicator right-click that
control or indicator, and choose Make Type Def. from the shortcut menu.
• To create a Type Definition from the Project Explorer right-click My Computer
and select New»New…
• Expand Other Files and choose Type Definition, then select OK.
• You can create a type definition control in the newly opened window, and
use it wherever you need.
Type Definition Recommendations
Any time you create a cluster or enum, you should immediately convert it to a Type
Def.
Cluster and enum data types are typically used in multiple places in an application.
```
Modifications to clusters and enums (for example, adding, modifying, or removing
```
```
items) typically need to propagate to all of their instances.
```
Copyright 2020 National Instruments
Lesson 13 Propagate Data Type Changes Using Type Definitions
13-6 | ni.com
Exercise 13-1: Using a Type Definition
Goal
• Create a weather data cluster type definition.
```
• Place the type definition in several places (e.g. subVI input/output, main VI
```
```
controls/indicators).
```
• Update the type definition and save to propagate data type changes to all
instances of the type definition
Scenario
As a LabVIEW developer, you can encounter situations where you need to define your
own custom data types in the form of clusters and enums. A challenge associated
with using custom data types is that you may need to change them later in
development. In addition, you may need to change them after they have already been
used in VIs. For example, you create copies of a custom data type and use them as
controls, indicators, or constants in one or more VIs.
Then you realize that the custom data type needs to change. You need to add, remove,
or change items in the cluster data type or the enum.
As a developer, you must ask yourself the following questions:
• What should happen to the copies of the custom data types used in VIs that are
already saved?
• Should the copies remain unchanged or should they update themselves to reflect
changes to the original?
Usually, you want all the copies of the custom data type to update if you update the
original custom data type. To achieve this, you need copies of the custom data types
to be tied to a type definition, which is defined as follows:
Type Definition—A master copy of a custom data type that multiple VIs can use.
Implementation
In this exercise, you modify the Determine Warnings subVI in such a way that the
changes to the Weather Data type definition propagate through the application.
When completed, the Weather Station application monitors temperature and wind
information.
1. Open C:\Exercises\LabVIEW Core 1\Type Def\Type Def.lvproj.
2. From the Project Explorer window, open the Determine Warnings VI.
3. Experiment with changing an existing cluster.
Place a file path control in the Weather Data In cluster control.
Notice that the Determine Warnings VI is broken. This is because the
Weather Data In and Weather Data Out clusters are no longer the same data
type.Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 13-7
Open the block diagram and notice the broken wire connected to the
Weather Data Out terminal.
Press <Ctrl-Z> to undo the addition of the file path control.
4. Make a type definition.
On the front panel, right-click the border of the Weather Data In control and
select Make Type Def.
Notice in the Project Explorer window that this has created a new file on your
hard drive marked Control 1.
On the block diagram, the Weather Data In terminal now has a black triangle
on the upper-left edge indicating that it is connected to a type definition.
Right-click the Weather Data In control and select Open Type Def. to display
the type definition in a new window.
The type definition window looks like the front panel of a VI but it does not
have a block diagram.
Rename the cluster as Weather Data.
Press <Ctrl-S> to save the type definition and name the type definition file
as Weather Data.
In the Project Explorer window, move the type definition file into the support
directory by dragging the file.
Close the type definition window when finished.
On the block diagram of the Determine Warnings VI, notice the coercion dot
on the Weather Data Out indicator terminal. This shows that the indicator is
not tied to the type definition.
5. Replace the Weather Data Out indicator with the type definition you just created.
On the front panel of the Determine Warnings VI, delete the Weather Data Out
indicator.
Drag the Weather Data type definition item from the Project Explorer window
to the front panel.
Right-click the border of the Weather Data type definition on the front panel
and select Change to Indicator. Rename the indicator as Weather Data Out.
Go to the block diagram and notice that the Weather Data Out terminal has a
black triangle on the upper-left edge, which indicates that it is connected to a
type definition.
Copyright 2020 National Instruments
Lesson 13 Propagate Data Type Changes Using Type Definitions
13-8 | ni.com
Update the VI connector pane to include the Weather Data Out indicator
because the indicator you previously deleted had been connected to the
connector pane.
– The connector pane is located in the upper-right corner of front panel.
– Connect the second-from-the-top terminal on the right side to the Weather
Data Out indicator, as shown in the following figure.
Note You can no longer add or remove elements to or from a type
definition cluster control/indicator on the front panel. You must open and
edit the type definition file to add or remove the element.
Save the Determine Warnings subVI.
6. Edit the Weather Data type definition to include wind speed information.
Right-click the border of the Weather Data In control and select Open Type
Def. from the shortcut menu.
Modify the front panel as shown in the following figure.
```
Apply the changes (File»Apply Changes) and Save the Weather Data type
```
definition before closing its window.
1 Numeric Control—Place a numeric control in the cluster and rename it as Current
Windspeed.
1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 13-9
On the Determine Warnings VI, notice that the Weather Data In control and
Weather Data Out indicator have been updated with the changes you made to
the Weather Data type definition. Arrange the front panel of the VI as shown
in the following figure.
7. Run and save the Determine Warnings subVI.
Your Turn
1. In this project, update the Main VI and Log Warnings VI. Replace all instances
```
(listed below) of the cluster in these VIs to use the Weather Data type definition.
```
Weather Data instances in the Log Warnings VI
– Weather Data In cluster
Note Make sure you reconnect the new type definition to the connector
pane
Weather Data instances in the Main VI
– Weather Data cluster constant
– Weather Data indicator
2. Modify the Weather Data type definition to include a numeric Max Windspeed
element and a Boolean Windspeed Warning? element. Rename the original
Warning? element as Temperature Warning?.
3. Verify that all instances of the type definition in all VIs are updated to include the
new elements.
Copyright 2020 National Instruments
Lesson 13 Propagate Data Type Changes Using Type Definitions
13-10 | ni.com
Your Turn
1. Create a new project and a new VI.
2. Create an enum that contains 3 items (e.g., Add, Subtract, and Multiply).
3. Convert the enum into a type definition.
4. Add the type definition to multiple places and VIs.
5. Modify the enum type definition to include a fourth item (for example, Divide).
Save the type definition.
6. Verify that all instances of the enum type definition update to include the new
element.
On the Job
1. List all the clusters and enums that will exist in your own application.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
2. Should you make these clusters and enums a type definition?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
If the cluster or enum exist in more than one place, you should definitely make it
a type definition.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 13-1
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 13-11
```
Activity: Lesson Review
```
1. You have input data representing a circle: x position (I16), y position (I16), and
```
radius (U16). In the future, you might need to modify your data to include other
```
related parameters.
What data type should you use to represent the circle in your application?
a. Three separate controls for the two positions and the radius
b. A cluster containing all of the data
c. An array with three elements
d. A type definition cluster
2. Which of the following data types should you almost always immediately make a
type definition?
a. Boolean
b. Cluster
c. 1D DBL Array
d. Enum
Copyright 2020 National Instruments
Lesson 13 Propagate Data Type Changes Using Type Definitions
13-12 | ni.com
```
Activity: Lesson Review – Answers
```
1. You have input data representing a circle: x position (I16), y position (I16), and
```
radius (U16). In the future, you might need to modify your data to include other
```
related parameters.
What data type should you use to represent the circle in your application?
a. Three separate controls for the two positions and the radius
b. A cluster containing all of the data
c. An array with three elements
d. A type definition cluster
2. What data types should you almost always immediately make a type definition?
a. Boolean
b. Cluster
c. 1D DBL Array
d. Enum
Copyright 2020 National Instruments
14
Implementing a
Sequencer
In this lesson, you learn how to sequence the tasks in your
application by using the state machine design pattern.
Topics
A. Understanding Sequential Programming
B. Understanding State Programming
C. Building State Machines
Exercises
Exercise 14-1 Creating a State Machine
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 14-3
A. Understanding Sequential Programming
In this section, we’ll take a look at sequential programming.
Why Use Sequential Programming?
Sequential programming ensures the execution order of tasks. In the following figure,
there is no mechanism to force the execution order of these events. Any one of these
events could happen first.
Flow-Through Parameters
To enforce sequential programming in LabVIEW, you can complete sequential tasks by
placing each task in a separate subVI, and wiring the subVIs in the order you want
them to execute using the error wires.
However, in this example, only two of the nodes have a error input/output. Using the
error wires, you can force the execution order of the two acquire data subVIs, but not
the One Button Dialog functions, as shown in the following figure.
Sequence Structures
A Sequence structure contains one or more subdiagrams, or frames, that execute in
sequential order. A Sequence structure frame cannot begin execution until everything
```
in the previous frame (to the left) has completed execution. You can use a Sequence
```
structure to specify execution in sequential order. A Sequence structure will always
execute every frame and cannot skip a frame.
Copyright 2020 National Instruments
Lesson 14 Implementing a Sequencer
14-4 | ni.com
Avoid Overuse of Sequence Structures
There are caveats that come with using Sequence structures.
You cannot stop the execution part way through the sequence, and Sequence
structures will continue to execute all frames even if errors are detected. In this figure,
the One Button Dialog function executes even if the acquire data subVI results in an
error.
Error Case Structure
Instead of using a Sequence structure, you can put the One Button Dialog function in
Case structures, and wire the error wire to the Selector input of the Case structures.
This has the added benefit of checking for errors. Now if the acquire data subVI
outputs an error, the Case structure can decide to not execute the One Button Dialog
```
function in the Error case.
```
B. Understanding State Programming
In this section, we’ll take a look at state transition diagrams.
When to Use State Programming?
If you want to execute a sequence of code only if a certain condition is met, use state
programming.
State programming helps you solve issues that sequential programming cannot.
For example, you can:
• Change the order of the sequence
• Repeat one item in the sequence more often than other items
• Execute items in the sequence only when certain conditions are met
• Stop the program immediately, instead of having to wait until the entire sequence
finishesCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 14-5
State Transition Diagram
A state transition diagram is a type of flowchart that indicates the states of a program
and transitions between states
State Part of a program that satisfies a condition, performs an action or waits
for an event.
Transition Condition, action, or event that causes the program to move to the next
state.
Copyright 2020 National Instruments
Lesson 14 Implementing a Sequencer
14-6 | ni.com
C. Building State Machines
In this section, we’ll learn how to build a state machine in LabVIEW.
What is a State Machine?
A state machine is a common and useful design pattern in LabVIEW that usually has
a start-up and shut-down state, along with other states. State machines can
implement any algorithms that can be explicitly described by a state transition diagram
or flowchart.
When to Use a State Machine
If your application logic can be described by a state transition diagram, you should use
the state machine design pattern to implement your application.
```
Multimedia: Building State Machines
```
Complete the multimedia module,Building State Machines, available in the
```
C:\Exercises\LabVIEW Core 1\Multimedia folder to learn about the following topics.
```
• State Machine Infrastructure
• State Machine Transitions
– Single Default
– Select Function
– Case Structure
– Transition Array
```
Demonstration: Exercise Overview
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 14-7
Exercise 14-1: Creating a State Machine
Goal
Create a VI that implements a state machine using a type definition enum.
Scenario
You must design a VI for a user interface state machine. The VI acquires a temperature
every half a second, analyzes each temperature to determine if the temperature is too
high or too low, and alerts the user if there is a danger of heatstroke or freeze. The
program logs the data if a warning occurs. If the user has not clicked the Stop button,
the entire process repeats. The state machine must also allow for expansion, because
processes may be added in the future.
Design
Use a state machine to create the VI in this exercise. The state transition diagram in
the following figure describes the logic for this application.
Copyright 2020 National Instruments
Lesson 14 Implementing a Sequencer
14-8 | ni.com
The following table describes the states in this state machine.
Implementation
1. Open Weather Station.lvproj in the C:\Exercises\
LabVIEW Core 1\State Machine directory.
2. Open the Weather Station UI VI from the Project Explorer window.
The figure below shows the front panel of the Weather Station UI VI that has been
provided for you. You modify the block diagram to create a state machine for the
weather station.
State Description Next State
Acquire Set time to zero and acquire data from
the temperature sensor
“Analyze”
Analyze Read front panel controls and determine
the warning level
“Log” if a warning occurs
“Check Time” if no warning
occurs
Log Log the data in a tab-delimited ASCII file “Check Time”
Check
Time
Check whether time elapsed is greater
than or equal to 0.5 seconds
“Acquire” if time has elapsed
“Check Time” if time has not
elapsed
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 14-9
The following figure shows the starting point of the block diagram for the Weather
Station UI VI. You edit this block diagram to implement a state machine for the
weather station application.
3. Create a new type definition to control the weather station application.
Open the block diagram and create an enum constant to the left of the While
Loop.
Right-click the enum constant and select Edit Items to open the Enum
Constant Properties window. On the Edit Items tab, add the enum items, as
shown in the following figure.
Right-click the enum constant on the block diagram and select Make Type Def.
4. Modify the new type definition and add it to the Weather Station project.
Right-click the enum constant and select Open Type Def.
1 These are the unused controls and indicators from the front panel. You will use
these controls and indicators to program different cases.
1
Copyright 2020 National Instruments
Lesson 14 Implementing a Sequencer
14-10 | ni.com
Rename the label on the enum control to
States
.
```
Apply the changes made to type definition (File»Apply Changes).Save the type definition as
```
Weather Station
States
in the
```
C:\Exercises\LabVIEW Core 1\State Machine\Supporting Files
```
directory.Close the
Type Def
window.
In the
Project Explorer
window, drag the Weather Station States type definition to your Supporting Files folder.
5.

Place a Case Structure inside the While Loop, as shown in the following figure. This is part of the state machine design pattern.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 14-11
6.

Control the state machine with the type definition enum and update the framework as shown in the following figure.
Note

After you finish wiring the Acquire case in the following step, some tunnels are empty because not all cases are wired yet.
1
Shift Register
—Right-click the While Loop and select
Add Shift Register
.
2
Type definition enum
constant—In the
Properties
window, enable the
Show Label
checkbox. Rename the label as
Beginning State
.
Wire the
Beginning State
constant to the shift register to initialize the shift register to the Acquire state. Wire the shift register to the
Selector
input of the Case Structure.
3
Add more cases. Right-click the Case Structure and select
Add Case For Every Value
to create different cases for each value in the enum.
4
Weather Data
—Drag the
Weather Data
type definition from the
Project Explorer
window to the block diagram to create a type definition
cluster constant.
5
Shift Register
—Place another shift register on the While Loop and wire the
Weather Data
constant to it.
6
Wire as shown.
42
51
3
6
Copyright 2020 National Instruments
Lesson 14 Implementing a Sequencer
14-12 | ni.com
7.

Complete the Acquire state shown in the following figure.
1
DAQmx Read
—In the Polymorphic VI Selector, set the following values:
Channel Type
: Analog
Channel Count
: Single Channel
Sample Count
: Single Sample
Data Format
: DBL
2
Temperature History
—Move this indicator into the Acquire state of the Case Structure.
3
Bundle By Name
—Set the element to
Current Temperature.
Wire the data output of the DAQmx Read VI to the
Current Temperature
input.
4
Next State enum
—Press <Ctrl> and click the
Beginning State
enum and drag a copy into the Acquire case. Rename this copy of the
Weather Station States type definition as
Next State
. Set the enum to
Analyze
and wire it through a tunnel on the Case Structure to
the shift register on the While Loop.
5
TRUE Constant
—Create a
TRUE
constant and wire it through the Case Structure to the
Elapsed Time
shift register. The
TRUE
constant
resets the Elapsed Time counter every time the VI executes the Acquire case.
6
Wire the DAQmx task, file reference,
Weather Data
cluster, enum, error, and Boolean through the block diagram to their corresponding
shift registers as shown.
3
2
1
4
5
6
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 14-13
8.

Complete the Analyze case as shown in the following figure.
1
Upper Limit and Lower Limit
—Move these controls into the Analyze state of the Case Structure.
2
Bundle By Name
—Replaces the
Max Temperature
and
Min Temperature
items with the values from the
Upper Limit
and
Lower Limit
controls. The Bundle By Name function makes it possible to wire the
Upper Limit
and
Lower Limit
values to the
Weather Data In
input
of the Determine Warnings subVI.
3
Determine Warnings
—In the
Project Explorer
window, find Determine Warnings VI inside the Supporting Files folder and drag it to the
block diagram.
4
Unbundle By Name
—Returns the values of specific items from the cluster.
5
Select
—Determines which state to execute next depending on whether or not a warning occurs.
6
Weather Station States
—Wire two copies of the
Weather Station States
type definition enum renamed as
Next State
to the Select
function. You can create these copies from the
Beginning State
enum.
7
Warning
—Move this indicator into the Analyze state of the Case Structure.
8
Wire the DAQmx task and file reference through the case as shown.
1
2
3
4
7
5
6
Copyright 2020 National Instruments
Lesson 14 Implementing a Sequencer
14-14 | ni.com
9.

Complete the
Log
case as shown in the following figure.
1
Log Warnings
—From the
Project Explorer
window, find Log Warnings
VI inside the Supporting Files folder and drag it to the block
diagram. This subVI logs weather data to file.
2
Next State
—Create a copy of the
Weather Station States
type definition enum , label it
Next State
, and set the next state to
Check
Time
.
Wire the DAQmx task and
Weather Data
cluster through the case as shown.
1
2
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 14-15
#### 10. Complete the Check Time case as shown in the following figure.\11. Save and test the VI.1

Next State
—Wire two copies of the
Weather Station States
type definition enum to the Select function.
2
Select
—Determines which state to execute next depending on whether or not time has elapsed.
3
```
Wait (ms)
```
—This function allows the CPU to do other tasks while this VI repeatedly executes the Check Time case until the Elapsed
Timer VI returns a TRUE value when 0.5 seconds have elapsed.
4
Stop
—Move the
Stop
button terminal from outside the While Loop. Wire the
Stop
button terminal to the Or function outside of the Case
Structure.
5
Use Default if unwired
—Right-click these tunnels and select
Use
Default If Unwired
. These Boolean tunnels will output a value of FALSE
in cases where these tunnels are unwired.Wire the DAQmx task, file reference, and
Weather Data
cluster through the case as shown.
3
1
2
4
5
Copyright 2020 National Instruments
Lesson 14 Implementing a Sequencer
14-16 | ni.com
Test
1. Run the VI.
Name the log file Weather Warning Log.txt when prompted.
Enter values for the Upper Limit and Lower Limit controls and observe the
behavior of the VI. Does it behave as expected?
2. Stop the VI.
3. Navigate to the Weather Warning Log.txt file and open it.
4. Notice the changes in the upper and lower limit values and the placement of tabs
and line breaks.
5. Close the log file.
6. Save and close the VI and the project.
On the Job
1. Back at your job, can your application’s logic be described by a state transition
diagram? If so, then draw the state transition diagram below:
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
2. Will you use a state machine to implement your state transition diagram in
LabVIEW code?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 14-1
```
Demonstration: Alternate Exercise Approach
```
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | 14-17
```
Activity: Lesson Review
```
1. When using a Sequence structure, you can stop the execution in the middle of a
sequence.
a. True
b. False
2. Which of the following are benefits of using a state machine instead of a
sequential structure?
a. You can change the order of the sequence.
b. You can repeat individual items in the sequence.
c. You can set conditions to determine when an item in the sequence should
execute.
d. You can stop the program at any point in the sequence.
Copyright 2020 National Instruments
Lesson 14 Implementing a Sequencer
14-18 | ni.com
```
Activity: Lesson Review – Answers
```
1. When using a Sequence structure, you can stop the execution in the middle of a
sequence.
a. True
b. False
You cannot stop the execution in the middle of a sequence.
2. Which of the following are benefits of using a state machine instead of a
sequential structure?
a. You can change the order of the sequence.
b. You can repeat individual items in the sequence.
c. You can set conditions to determine when an item in the sequence should
execute.
d. You can stop the program at any point in the sequence.
Copyright 2020 National Instruments
A
Advanced File
I/O
In this lesson, we will take a closer look at TDMS files and
binary files.
Topics
- File Formats
- Access TDMS Files in LabVIEW and Excel
- Write and Read Binary Files
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | A-3
A. File Formats
You can view this entire lesson from theAdvanced File I/O multimedia module,
available in the C:\Exercises\LabVIEW Core 1\Multimedia folder.
Common Log File Formats
There are three common file types that you might work with in LabVIEW:
```
• Text (ASCII) files
```
• TDMS files
• Binary files
Text files are the easiest format to use and share, as many applications, such as
notepad and Microsoft Excel, can read from or write to a text file. Data is represented
as strings in text files.
TDMS is a binary file format created by NI that is optimized for saving measurement
data to file. You can use TDMS files to organize data and store information about your
data. You can also use TDMS files to write and read data at high speeds. You can also
use an add-in to view TDMS files in Microsoft Excel.
Binary is a file format that you can use when you want to write to or read from a binary
file with a specific binary format.
Explore the table below to compare text, binary, and TDMS files.
B. Access TDMS Files in LabVIEW and Excel
In this section, we will learn about TDMS files.
TDMS File Format
The TDMS file format is a binary format that was designed specifically for saving
measurement data to file.
It contains two types of data—raw data and metadata.
You can use the TDMS file format to store measurement data along with
channel-specific properties such as channel name, measurement units, test limits, and
sensor information.
```
Text (ASCII) Binary TDMS
```
Easily Readable X
Small disk footprint X X
High-speed streaming X X
Searchable X
Inherent attributes X
Copyright 2020 National Instruments
Appendix A Advanced File I/O
A-4 | ni.com
The TDMS index file is a binary file that provides consolidated information on all the
attributes and pointers in the TDMS file. This speeds up access to data. The TDMS
index file automatically regenerates if it is lost.
TDMS Files—Data Hierarchy and Properties
The TDMS file format is structured using three levels
• File
• Channel group
• Channel
A single TDMS file can contain multiple channel groups, and each channel group can
contain multiple channels. You can choose how to organize your data to make it easier
to understand.
For example, you may have one group for your raw data and another group for your
analyzed data in a single file. Or, you might have multiple groups that correspond to
sensor types or locations.
Additionally, at each level, you can store multiple properties to provide metadata. This
helps you achieve well-documented and search-ready data files.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | A-5
TDMS Functions
Use the TDMS functions to write to, read from, and search TDMS files.
```
Demonstration: Writing and Reading TDMS Files
```
C. Write and Read Binary Files
In this section, we will briefly discuss writing and reading binary files.
In the example shown in the figure below, the Writer VI passes a 1D double-precision
array containing 100 values to the Write to Binary File function.¬ Each DBL has a size
of 64 bits which is 8 bytes.¬ The binary file created by the Writer VI will contain 800
bytes because there are 100 DBLs and each DBL is 8 bytes.
To read a binary file correctly, the Reader must know exactly how the binary file
organizes its data.¬ Because we know that this binary file contains multiple DBLs next
to each other, this VI uses the Get File Size to get the file size in bytes. In this case
the file is 800 bytes.¬ The Reader VI then divides the total number of bytes by the size
of the DBL data type, which is 8 bytes, to get the total number of DBL numbers in this
file.
Channel A segment of a TDMS file that stores measurement signals or raw data as
binary data. Each channel can have properties that describe the data.
Channel group A segment of a TDMS file that contains properties to store information as well
as one or more channels. Use channel groups to organize your data and to
store information that applies to multiple channels.
Copyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | A-6
Then, the Read from Binary File node is configured to interpret the read data as a DBL and is configured to read 100 DBLs from the file.Binary File Considerations and Summary•
You should evaluate using text and TDMS files before considering using binary files.
•
Compared to other formats, binary files are complex to work with and require an intimate knowledge of the file format.
•
Debugging code can add considerable time to the development cycle if things go wrong.
Copyright 2020 National Instruments
B
Additional
Information and
Resources
NI provides global services and support as part of our
commitment to your success. Take advantage of product
services in addition to training and certification programs
that meet your needs during each phase of the application
```
life cycle; from planning and development through
```
deployment and ongoing maintenance.
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 1
© National Instruments Corporation | B-3
A. NI Services
To get started, register your product at ni.com/myproducts.
As a registered NI product user, you are entitled to the following benefits:
• Access to applicable product services.
• Easier product management with an online account.
• Receive critical part notifications, software updates, and service expirations.
Log in to your NI ni.com User Profile to get personalized access to your services.
B. Services and Resources
• Maintenance and Hardware Services—NI helps you identify your systems’
accuracy and reliability requirements and provides warranty, sparing, and
calibration services to help you maintain accuracy and minimize downtime over
the life of your system. Visit ni.com/services for more information.
– Warranty and Repair—All NI hardware features a one-year standard warranty
that is extendable up to five years. NI offers repair services performed in a
timely manner by highly trained factory technicians using only original parts at
a National Instruments service center.
– Calibration—Through regular calibration, you can quantify and improve the
measurement performance of an instrument. NI provides state-of-the-art
calibration services. If your product supports calibration, you can obtain the
calibration certificate for your product at ni.com/calibration.
• System Integration—If you have time constraints, limited in-house technical
resources, or other project challenges, National Instruments Alliance Partner
members can help. To learn more, call your local NI office or visit ni.com/alliance.
• Training and Certification—The NI training and certification program is the most
effective way to increase application development proficiency and productivity.
Visit ni.com/training for more information.
– The Skills Guide assists you in identifying the proficiency requirements of your
current application and gives you options for obtaining those skills consistent
with your time and budget constraints and personal learning preferences. Visit
ni.com/skills-guide to see these custom paths.
– NI offers courses in several languages and formats including instructor-led
classes at facilities worldwide, courses on-site at your facility, and online
courses to serve your individual needs.
• Technical Support—Support at ni.com/support includes the following resources:
– Self-Help Technical Resources—Visit ni.com/support for software drivers and
updates, a searchable KnowledgeBase, product manuals, step-by-step
troubleshooting wizards, thousands of example programs, tutorials,
application notes, instrument drivers, and so on. Registered users also receive
access to the NI Discussion Forums at ni.com/forums. NI Applications
Engineers make sure every question submitted online receives an answer.
```
– Software Support Service Membership—The Standard Service Program (SSP)
```
is a renewable one-year subscription included with almost every NI software
product, including NI Developer Suite. This program entitles members to direct
access to NI Applications Engineers through phone and email for one-to-one
technical support, as well as exclusive access to online training modules at
ni.com/self-paced-training. NI also offers flexible extended contract options
Copyright 2020 National Instruments
Appendix B
B-4 | ni.com
that guarantee your SSP benefits are available without interruption for as long
as you need them. Visit ni.com/ssp for more information.
```
• Declaration of Conformity (DoC)—A DoC is our claim of compliance with the
```
Council of the European Communities using the manufacturer’s declaration of
conformity. This system affords the user protection for electromagnetic
```
compatibility (EMC) and product safety. You can obtain the DoC for your product
```
by visiting ni.com/certification.
For information about other technical support options in your area, visit
ni.com/services, or contact your local office at ni.com/contact.
You also can visit the Worldwide Offices section of ni.com/niglobal to access the
branch office websites, which provide up-to-date contact information, support phone
numbers, email addresses, and current events.
C. Other NI Training Courses
NI offers several training courses for LabVIEW users. These courses continue the
training you received here and expand it to other areas. Visit ni.com/training to
purchase course materials or sign up for instructor-led, hands-on courses at locations
around the world.
D. NI Certification
Earning an NI certification acknowledges your expertise in working with NI products
and technologies. The measurement and automation industry, your employer, clients,
and peers recognize your NI certification credential as a symbol of the skills and
knowledge you have gained through experience. Visit ni.com/training for more
information about the NI certification program.
Copyright 2020 National Instruments