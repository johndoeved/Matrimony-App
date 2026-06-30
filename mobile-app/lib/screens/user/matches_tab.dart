import 'package:flutter/material.dart';
import '../../network/api_client.dart';

class MatchesTab extends StatefulWidget {
  const MatchesTab({super.key});

  @override
  State<MatchesTab> createState() => _MatchesTabState();
}

class _MatchesTabState extends State<MatchesTab> {
  List _matches = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchMatches();
  }

  Future<void> _fetchMatches() async {
    try {
      final res = await apiClient.dio.get('/profiles/matches');
      if (mounted) {
        setState(() {
          _matches = res.data;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }
    
    if (_matches.isEmpty) {
      return const Center(child: Text('No matches found yet. Try again later.'));
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _matches.length,
      itemBuilder: (context, index) {
        final profile = _matches[index];
        final city = profile['location']?['city'] ?? 'Unknown City';
        final occupation = profile['professional']?['occupation'] ?? 'Unknown Occupation';
        final religion = profile['religion'] ?? 'No Religion';
        final gender = profile['gender'] ?? 'Unknown';
        
        return Card(
          elevation: 2,
          margin: const EdgeInsets.only(bottom: 16),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: Theme.of(context).colorScheme.primary.withOpacity(0.2),
              child: const Icon(Icons.favorite, color: Colors.pink),
            ),
            title: Text('$gender • $religion', style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text('$occupation in $city'),
            trailing: const Icon(Icons.chat_bubble_outline),
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Starting chat...')));
            },
          ),
        );
      },
    );
  }
}
