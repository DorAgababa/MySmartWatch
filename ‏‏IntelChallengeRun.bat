@echo off




rem get into nodejs directory
cd NodeJSscript


echo run NodeJS

rem run it in the directory
node getDataToFolder.js

rem Navigate to the main directory of the current batch file 
cd /d "%~dp0"

rem get into quartosDirectory(get inside Stage2 directory)
cd Stage2


rem Set environment variables
setx QUARTUS_ROOTDIR "C:\intelFPGA_lite\21.1"
setx PATH "C:\intelFPGA_lite\21.1\quartus\bin64;C:\intelFPGA_lite\21.1\quartus;%PATH%"

rem unarchive the qar file
quartus_sh --restore TimeIT.qar

rem run TCL script
quartus_sh -t DE10_LITE_PINS.tcl -no_gui


rem Compile the Quartus project
quartus_sh --flow compile TimeIT.qpf

rem Program the FPGA
quartus_pgm -m jtag -c USB-Blaster -o "p;TimeIT.sof"


echo   python work on UART 

rem Navigate to the main directory of the current batch file 
cd /d "%~dp0"

REM Check if serial package is installed
py -c "import serial" >nul 2>&1
if %errorlevel% equ 0 (
    echo Serial package is already installed.
) else (
    echo Installing serial package...
    py -m pip install serial
)

REM Check if serial package is installed
py -c "import pyserial" >nul 2>&1
if %errorlevel% equ 0 (
    echo pySerial package is already installed.
) else (
    echo Installing pyserial package...
    py -m pip install pyserial
)
rem run python program 
py  pythonScript\main.py"




pause




pause
