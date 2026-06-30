import 'package:flutter/material.dart';

class ProfileViewScreen extends StatelessWidget {
  const ProfileViewScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile Details'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Cover and Avatar
            Container(
              height: 250,
              width: double.infinity,
              color: Colors.grey[200],
              child: const Center(
                child: Icon(Icons.person, size: 100, color: Colors.grey),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Text(
                        'Ramesh Parmar',
                        style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(width: 8),
                      Icon(Icons.verified, color: Theme.of(context).colorScheme.secondary),
                    ],
                  ),
                  const Text('ID: DM-10293 • 25 yrs • 5\'8"'),
                  const SizedBox(height: 16),
                  const Divider(),
                  _buildSectionTitle('About Myself'),
                  const Text('I am a software engineer working in a reputed firm. Looking for a supportive partner.'),
                  const SizedBox(height: 16),
                  _buildSectionTitle('Personal Information'),
                  const Text('Religion: Hindu\nCaste: Dhobi\nLocation: Mumbai, India'),
                  const SizedBox(height: 16),
                  _buildSectionTitle('Professional Details'),
                  const Text('Education: B.Tech\nOccupation: Software Developer\nIncome: Upgrade to view'),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: () {},
                child: const Text('Skip'),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  foregroundColor: Colors.white,
                ),
                child: const Text('Send Interest'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Text(
        title,
        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
      ),
    );
  }
}
