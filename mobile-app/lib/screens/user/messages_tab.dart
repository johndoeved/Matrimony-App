import 'package:flutter/material.dart';
import '../../network/socket_service.dart';

class MessagesTab extends StatefulWidget {
  const MessagesTab({super.key});

  @override
  State<MessagesTab> createState() => _MessagesTabState();
}

class _MessagesTabState extends State<MessagesTab> {
  final List<String> _messages = [];
  final TextEditingController _msgController = TextEditingController();

  @override
  void initState() {
    super.initState();
    socketService.connect();
    
    // Listen for incoming messages from the WebSocket server
    socketService.socket.on('receiveMessage', (data) {
      if (mounted && data['senderId'] != 'me') {
        setState(() {
          _messages.add('Match: ${data['text']}');
        });
      }
    });
  }

  @override
  void dispose() {
    socketService.disconnect();
    _msgController.dispose();
    super.dispose();
  }

  void _sendMsg() {
    final txt = _msgController.text.trim();
    if (txt.isNotEmpty) {
      // Broadcast to server
      socketService.sendMessage(txt, 'me', 'other');
      _msgController.clear();
      
      // Update UI optimistically
      setState(() {
        _messages.add('You: $txt');
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: double.infinity,
          color: Colors.grey[200],
          padding: const EdgeInsets.all(12),
          child: const Text('Live WebSocket Connection Active', textAlign: TextAlign.center, style: TextStyle(fontWeight: FontWeight.bold, color: Colors.green)),
        ),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: _messages.length,
            itemBuilder: (context, index) {
              final isMe = _messages[index].startsWith('You:');
              return Align(
                alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
                child: Container(
                  margin: const EdgeInsets.symmetric(vertical: 4),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  decoration: BoxDecoration(
                    color: isMe ? Theme.of(context).colorScheme.primary : Colors.grey[300],
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    _messages[index],
                    style: TextStyle(color: isMe ? Colors.white : Colors.black87),
                  ),
                ),
              );
            },
          ),
        ),
        Container(
          padding: const EdgeInsets.all(8.0),
          decoration: BoxDecoration(
            color: Colors.white,
            boxShadow: [BoxShadow(color: Colors.grey.withOpacity(0.2), spreadRadius: 1, blurRadius: 3)],
          ),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _msgController,
                  decoration: InputDecoration(
                    hintText: 'Type a message...',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(30)),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              CircleAvatar(
                backgroundColor: Theme.of(context).colorScheme.primary,
                child: IconButton(
                  icon: const Icon(Icons.send, color: Colors.white),
                  onPressed: _sendMsg,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
