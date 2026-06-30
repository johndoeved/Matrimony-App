import 'package:flutter/material.dart';

class SubscriptionScreen extends StatelessWidget {
  const SubscriptionScreen({super.key});

  void _processPayment(BuildContext context, String planName) {
    // In a real app, integrate Razorpay or Stripe SDK here.
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Processing payment for $planName...'),
        backgroundColor: Colors.blue,
      ),
    );
    Future.delayed(const Duration(seconds: 2), () {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Payment Successful! You are now a Premium Member 🎉'),
          backgroundColor: Colors.green,
        ),
      );
      Navigator.pop(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Upgrade to Premium'),
        backgroundColor: const Color(0xFFE91E63),
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Icon(Icons.workspace_premium, size: 100, color: Colors.amber),
            const SizedBox(height: 16),
            const Text(
              'Unlock Premium Features',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            const Text(
              'Connect with your matches instantly through chat and live video calls.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16, color: Colors.black54),
            ),
            const SizedBox(height: 40),
            _buildPricingCard(
              context,
              'Gold Plan',
              '₹999 / month',
              ['Unlimited Chat', 'View Contact Details', 'Priority Matchmaking'],
              Colors.amber.shade700,
            ),
            const SizedBox(height: 16),
            _buildPricingCard(
              context,
              'Platinum Plan',
              '₹2,499 / 3 months',
              ['All Gold Features', 'Unlimited Video Calling', 'Profile Highlights'],
              Colors.blueGrey.shade700,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPricingCard(BuildContext context, String title, String price, List<String> features, Color color) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: color, width: 2)),
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Text(title, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color)),
            const SizedBox(height: 8),
            Text(price, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const Divider(height: 32),
            ...features.map((f) => Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                children: [
                  Icon(Icons.check_circle, color: color, size: 20),
                  const SizedBox(width: 12),
                  Text(f, style: const TextStyle(fontSize: 16)),
                ],
              ),
            )),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => _processPayment(context, title),
              style: ElevatedButton.styleFrom(
                backgroundColor: color,
                foregroundColor: Colors.white,
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
              ),
              child: const Text('Select Plan', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            )
          ],
        ),
      ),
    );
  }
}
