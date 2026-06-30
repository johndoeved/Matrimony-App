import 'package:flutter/material.dart';

class VersionManager {
  static const String currentAppVersion = "1.0.0";
  // In a real app, fetch minimumRequiredVersion from an API (e.g., Firebase Remote Config)
  static const String minimumRequiredVersion = "1.0.0"; 

  static void checkVersion(BuildContext context) {
    if (_isUpdateRequired(currentAppVersion, minimumRequiredVersion)) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const ForceUpdateScreen()),
      );
    }
  }

  static bool _isUpdateRequired(String current, String requiredVersion) {
    // Simple string comparison for prototype
    return current.compareTo(requiredVersion) < 0;
  }
}

class ForceUpdateScreen extends StatelessWidget {
  const ForceUpdateScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.system_update, size: 100, color: Theme.of(context).colorScheme.primary),
              const SizedBox(height: 32),
              const Text(
                'Update Required',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              const Text(
                'A critical new version of Dhobi Matrimony is available. Please update the app to continue finding your perfect match safely.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16, color: Colors.black87),
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: () {
                  // Redirect to App Store / Play Store
                },
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 56),
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  foregroundColor: Colors.white,
                ),
                child: const Text('Update Now', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
