import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../providers/auth_provider.dart';
import '../../network/api_client.dart';
import 'main_navigation.dart';

class RegistrationWizard extends ConsumerStatefulWidget {
  const RegistrationWizard({super.key});

  @override
  ConsumerState<RegistrationWizard> createState() => _RegistrationWizardState();
}

class _RegistrationWizardState extends ConsumerState<RegistrationWizard> {
  int _currentStep = 0;
  bool _isLoading = false;

  final genderCtrl = TextEditingController();
  final religionCtrl = TextEditingController();
  final cityCtrl = TextEditingController();
  final occupationCtrl = TextEditingController();

  Future<void> _submitProfile() async {
    setState(() => _isLoading = true);
    try {
      // 1. Generate a mock email for this demo
      final mockEmail = 'user_${DateTime.now().millisecondsSinceEpoch}@test.com';
      
      // 2. Register the user via API
      final regRes = await apiClient.dio.post('/auth/register', data: {
        'emailOrPhone': mockEmail,
        'password': 'password123'
      });
      final userId = regRes.data['user']['_id'];
      
      // 3. Submit Profile linked to the User ID via API
      await apiClient.dio.post('/profiles', data: {
        'user': userId,
        'gender': genderCtrl.text,
        'religion': religionCtrl.text,
        'location': {'city': cityCtrl.text, 'country': 'India', 'state': 'State'},
        'professional': {'occupation': occupationCtrl.text, 'education': 'B.Tech', 'incomeRange': '5L-10L'},
      });

      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Profile created and saved to MongoDB!')));
      
      // Navigate into the app
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const MainNavigation()));
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error submitting profile: $e')));
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _onStepContinue() {
    if (_currentStep < 4) {
      setState(() => _currentStep += 1);
    } else {
      _submitProfile();
    }
  }

  void _onStepCancel() {
    if (_currentStep > 0) {
      setState(() => _currentStep -= 1);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Profile'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Colors.white,
      ),
      body: _isLoading 
        ? const Center(child: CircularProgressIndicator())
        : Stepper(
        type: StepperType.horizontal,
        currentStep: _currentStep,
        onStepContinue: _onStepContinue,
        onStepCancel: _onStepCancel,
        steps: [
          Step(
            title: const Text('Personal'),
            content: TextField(controller: genderCtrl, decoration: const InputDecoration(labelText: 'Gender (Male/Female)')),
            isActive: _currentStep >= 0,
          ),
          Step(
            title: const Text('Religion'),
            content: TextField(controller: religionCtrl, decoration: const InputDecoration(labelText: 'Religion / Caste')),
            isActive: _currentStep >= 1,
          ),
          Step(
            title: const Text('Location'),
            content: TextField(controller: cityCtrl, decoration: const InputDecoration(labelText: 'City')),
            isActive: _currentStep >= 2,
          ),
          Step(
            title: const Text('Profession'),
            content: TextField(controller: occupationCtrl, decoration: const InputDecoration(labelText: 'Occupation')),
            isActive: _currentStep >= 3,
          ),
          Step(
            title: const Text('Submit'),
            content: const Text('Ready to submit your profile for admin review! Clicking continue will save to MongoDB.'),
            isActive: _currentStep >= 4,
          ),
        ],
      ),
    );
  }
}
