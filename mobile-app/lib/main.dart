import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'screens/startup/version_check_screen.dart';

void main() {
  runApp(const ProviderScope(child: DhobiMatrimonyApp()));
}

class DhobiMatrimonyApp extends StatelessWidget {
  const DhobiMatrimonyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dhobi Matrimony',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFE91E63)),
        useMaterial3: true,
      ),
      // Redirect to the Version Check Screen first instead of Login directly
      home: const VersionCheckScreen(), 
    );
  }
}
