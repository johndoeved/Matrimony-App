import 'package:flutter/material.dart';

class IdVerificationScreen extends StatefulWidget {
  const IdVerificationScreen({super.key});

  @override
  State<IdVerificationScreen> createState() => _IdVerificationScreenState();
}

class _IdVerificationScreenState extends State<IdVerificationScreen> {
  bool _idUploaded = false;
  bool _selfieUploaded = false;

  void _uploadId() {
    // Logic to open camera/gallery to capture Government ID
    setState(() => _idUploaded = true);
  }

  void _takeSelfie() {
    // Logic to open front camera for selfie
    setState(() => _selfieUploaded = true);
  }

  void _submitVerification() {
    if (_idUploaded && _selfieUploaded) {
      // Submit securely to backend
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Documents submitted successfully. Pending Admin approval.')),
      );
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Verify Identity'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'To ensure a safe and trusted environment, we require all users to verify their identity before their profile becomes active.',
              style: TextStyle(fontSize: 16, color: Colors.black87),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            _buildUploadCard(
              title: '1. Government ID',
              subtitle: 'Upload Aadhaar, PAN, or Passport',
              icon: Icons.badge,
              isComplete: _idUploaded,
              onTap: _uploadId,
            ),
            const SizedBox(height: 16),
            _buildUploadCard(
              title: '2. Selfie',
              subtitle: 'Take a clear selfie to match your ID',
              icon: Icons.camera_front,
              isComplete: _selfieUploaded,
              onTap: _takeSelfie,
            ),
            const Spacer(),
            ElevatedButton(
              onPressed: (_idUploaded && _selfieUploaded) ? _submitVerification : null,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                backgroundColor: Theme.of(context).colorScheme.primary,
                foregroundColor: Colors.white,
              ),
              child: const Text('Submit for Verification', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildUploadCard({
    required String title,
    required String subtitle,
    required IconData icon,
    required bool isComplete,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        leading: Icon(icon, size: 40, color: Theme.of(context).colorScheme.primary),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
        trailing: isComplete
            ? const Icon(Icons.check_circle, color: Colors.green, size: 36)
            : OutlinedButton(
                onPressed: onTap, 
                child: const Text('Upload'),
              ),
      ),
    );
  }
}
