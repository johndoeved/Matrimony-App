import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  late IO.Socket socket;

  void connect() {
    socket = IO.io('http://127.0.0.1:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': true,
    });
    
    socket.connect();
    
    socket.onConnect((_) {
      print('Socket connected successfully to NestJS!');
    });
    
    socket.onDisconnect((_) {
      print('Socket disconnected');
    });
  }
  
  void sendMessage(String text, String senderId, String receiverId) {
    socket.emit('sendMessage', {
      'text': text,
      'senderId': senderId,
      'receiverId': receiverId,
      'timestamp': DateTime.now().toIso8601String(),
    });
  }

  void disconnect() {
    socket.disconnect();
  }
}

final socketService = SocketService();
