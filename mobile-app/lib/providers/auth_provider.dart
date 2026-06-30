import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../network/api_client.dart';

class AuthState {
  final bool isAuthenticated;
  final String? role;
  final bool isLoading;
  final String? error;

  AuthState({this.isAuthenticated = false, this.role, this.isLoading = false, this.error});

  AuthState copyWith({bool? isAuthenticated, String? role, bool? isLoading, String? error}) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      role: role ?? this.role,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }
}

class AuthNotifier extends Notifier<AuthState> {
  @override
  AuthState build() {
    return AuthState();
  }

  Future<void> login(String emailOrPhone, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final response = await apiClient.dio.post('/auth/login', data: {
        'emailOrPhone': emailOrPhone,
        'password': password
      });
      
      final role = response.data['user']['role'];
      
      state = state.copyWith(
        isAuthenticated: true,
        role: role,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: 'Login failed: Invalid credentials or server offline');
    }
  }

  void logout() {
    state = AuthState();
  }
}

final authProvider = NotifierProvider<AuthNotifier, AuthState>(() {
  return AuthNotifier();
});
