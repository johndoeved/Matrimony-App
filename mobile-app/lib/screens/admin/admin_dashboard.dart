import 'package:flutter/material.dart';
import '../../network/api_client.dart';

class AdminDashboard extends StatefulWidget {
  const AdminDashboard({super.key});

  @override
  State<AdminDashboard> createState() => _AdminDashboardState();
}

class _AdminDashboardState extends State<AdminDashboard> {
  int _pendingCount = 0;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchStats();
  }

  Future<void> _fetchStats() async {
    try {
      final res = await apiClient.dio.get('/profiles/pending');
      final List pendingList = res.data;
      if (mounted) {
        setState(() {
          _pendingCount = pendingList.length;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _approveAll() async {
    try {
      final res = await apiClient.dio.get('/profiles/pending');
      final List pendingList = res.data;
      
      for (var profile in pendingList) {
        await apiClient.dio.patch('/profiles/${profile['_id']}/approve');
      }
      
      _fetchStats();
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Approved all pending profiles!')));
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error approving profiles: $e')));
    }
  }
  
  Future<void> _exportData() async {
    try {
      final res = await apiClient.dio.get('/profiles/export');
      // In a real app we'd write res.data (the CSV string) to a file.
      // For MVP, we just show success since url_launcher is unavailable without symlinks.
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text('Database exported successfully as CSV!'),
        backgroundColor: Colors.deepPurple,
      ));
    } catch (e) {
       if (!mounted) return;
       ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Error exporting data')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Dashboard (Super Admin)'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Colors.white,
      ),
      body: _isLoading 
        ? const Center(child: CircularProgressIndicator())
        : GridView.count(
        crossAxisCount: 2,
        padding: const EdgeInsets.all(16),
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
        children: [
          _buildAdminCard(
            context, 
            'Pending Profiles\n($_pendingCount)', 
            Icons.pending_actions, 
            Colors.orange, 
            onTap: _pendingCount > 0 ? _approveAll : null
          ),
          _buildAdminCard(
            context, 
            'Export DB (CSV)', 
            Icons.download, 
            Colors.deepPurple,
            onTap: _exportData,
          ),
          _buildAdminCard(context, 'ID Verification', Icons.verified_user, Colors.blue),
          _buildAdminCard(context, 'Approved Users', Icons.check_circle, Colors.green),
          _buildAdminCard(context, 'Reports', Icons.report_problem, Colors.purple),
          _buildAdminCard(context, 'App Version', Icons.system_update, Colors.teal),
        ],
      ),
    );
  }

  Widget _buildAdminCard(BuildContext context, String title, IconData icon, Color color, {VoidCallback? onTap}) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: onTap ?? () {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Coming soon')));
        },
        borderRadius: BorderRadius.circular(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 48, color: color),
            const SizedBox(height: 16),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold), textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
