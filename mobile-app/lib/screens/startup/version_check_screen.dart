import 'package:flutter/material.dart';
import '../../network/api_client.dart';
import '../auth/login_screen.dart';

class VersionCheckScreen extends StatefulWidget {
  const VersionCheckScreen({super.key});

  @override
  State<VersionCheckScreen> createState() => _VersionCheckScreenState();
}

class _VersionCheckScreenState extends State<VersionCheckScreen> {
  // Hardcoded for this demo since we cannot use package_info on this OS environment
  static const String currentAppVersion = '1.0.0'; 
  
  bool _isLoading = true;
  String? _error;
  Map<String, dynamic>? _versionInfo;

  @override
  void initState() {
    super.initState();
    _checkVersion();
  }

  Future<void> _checkVersion() async {
    try {
      // Hitting the custom NestJS App Version Manager endpoint
      final res = await apiClient.dio.get('/version');
      _versionInfo = res.data;
      
      final latest = _versionInfo!['latestVersion'] as String;
      
      if (latest != currentAppVersion) {
        // Needs update, stop loading and show the prompt UI
        setState(() => _isLoading = false);
      } else {
        // App is up to date, silently proceed to the Login Screen
        _proceedToApp();
      }
    } catch (e) {
      // If network fails (e.g., server offline), allow them to proceed or show error
      setState(() {
        _error = 'Failed to check app version. Please check connection.';
        _isLoading = false;
      });
    }
  }

  void _proceedToApp() {
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const LoginScreen()));
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        backgroundColor: Colors.white,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.network('https://cdn-icons-png.flaticon.com/512/3175/3175199.png', height: 100),
              const SizedBox(height: 20),
              const CircularProgressIndicator(),
              const SizedBox(height: 20),
              const Text('Checking for updates...', style: TextStyle(color: Colors.grey)),
            ],
          ),
        ),
      );
    }

    if (_error != null) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.cloud_off, size: 80, color: Colors.grey),
              const SizedBox(height: 20),
              Text(_error!, textAlign: TextAlign.center),
              const SizedBox(height: 20),
              ElevatedButton(onPressed: _proceedToApp, child: const Text('Continue Anyway'))
            ],
          ),
        ),
      );
    }

    // Show Custom App Update Prompt (Bypassing Play Store)
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.system_update, size: 100, color: Colors.blue),
              const SizedBox(height: 30),
              const Text('Update Available!', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              const SizedBox(height: 10),
              Text('A new version (${_versionInfo!['latestVersion']}) is available.\n\nRelease Notes:\n${_versionInfo!['releaseNotes']}', textAlign: TextAlign.center),
              const SizedBox(height: 40),
              ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Downloading APK from: ${_versionInfo!['updateUrl']}')));
                },
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                  backgroundColor: Colors.blue,
                  foregroundColor: Colors.white,
                ),
                child: const Text('Download Update'),
              ),
              const SizedBox(height: 10),
              if (!(_versionInfo!['forceUpdate'] as bool))
                TextButton(onPressed: _proceedToApp, child: const Text('Skip for now', style: TextStyle(color: Colors.grey))),
            ],
          ),
        ),
      ),
    );
  }
}
