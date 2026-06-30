import 'package:flutter/material.dart';

class VideoCallScreen extends StatefulWidget {
  final String matchName;

  const VideoCallScreen({super.key, required this.matchName});

  @override
  State<VideoCallScreen> createState() => _VideoCallScreenState();
}

class _VideoCallScreenState extends State<VideoCallScreen> {
  bool _isMuted = false;
  bool _isVideoOff = false;

  void _endCall() {
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Stack(
          children: [
            // Mock Remote Video Stream
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.person, size: 120, color: Colors.white24),
                  const SizedBox(height: 16),
                  Text('Waiting for ${widget.matchName} to join...', style: const TextStyle(color: Colors.white70)),
                ],
              ),
            ),
            
            // Mock Local Video Stream
            Positioned(
              top: 20,
              right: 20,
              child: Container(
                width: 100,
                height: 150,
                decoration: BoxDecoration(
                  color: Colors.grey.shade900,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white24),
                ),
                child: _isVideoOff 
                  ? const Center(child: Icon(Icons.videocam_off, color: Colors.white54))
                  : const Center(child: Text('You', style: TextStyle(color: Colors.white54))),
              ),
            ),
            
            // Call Controls
            Positioned(
              bottom: 40,
              left: 0,
              right: 0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  FloatingActionButton(
                    heroTag: 'mute_btn',
                    backgroundColor: _isMuted ? Colors.white : Colors.grey.shade800,
                    foregroundColor: _isMuted ? Colors.black : Colors.white,
                    onPressed: () => setState(() => _isMuted = !_isMuted),
                    child: Icon(_isMuted ? Icons.mic_off : Icons.mic),
                  ),
                  FloatingActionButton(
                    heroTag: 'end_call_btn',
                    backgroundColor: Colors.red,
                    foregroundColor: Colors.white,
                    onPressed: _endCall,
                    child: const Icon(Icons.call_end, size: 32),
                  ),
                  FloatingActionButton(
                    heroTag: 'video_btn',
                    backgroundColor: _isVideoOff ? Colors.white : Colors.grey.shade800,
                    foregroundColor: _isVideoOff ? Colors.black : Colors.white,
                    onPressed: () => setState(() => _isVideoOff = !_isVideoOff),
                    child: Icon(_isVideoOff ? Icons.videocam_off : Icons.videocam),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
