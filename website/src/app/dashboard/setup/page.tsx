'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function ProfileSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    gender: 'male',
    dateOfBirth: '',
    height: '',
    maritalStatus: 'Never Married',
    physicalStatus: 'Normal',
    religion: 'Hindu',
    caste: 'Dhobi',
    subcaste: '',
    rashi: '',
    haveDosh: 'No',
    education: '',
    occupation: '',
    incomeRange: '',
    country: 'India',
    state: '',
    city: '',
    familyStatus: 'Middle Class',
    bio: '',
    idDocumentUrl: '',
    photos: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    // Mock file upload: Just setting a dummy URL for now.
    if (e.target.files && e.target.files[0]) {
      const dummyUrl = `https://example.com/uploads/${e.target.files[0].name}`;
      if (field === 'photos') {
        setFormData({ ...formData, photos: [...formData.photos, dummyUrl] });
      } else {
        setFormData({ ...formData, [field]: dummyUrl });
      }
      alert(`File selected: ${e.target.files[0].name}. (Mock Upload Successful)`);
    }
  };

  const submitProfile = async () => {
    if (!formData.dateOfBirth) {
      alert("Please select your Date of Birth in Step 1 before submitting.");
      setStep(1);
      return;
    }

    setLoading(true);
    try {
      let userId = '64d1f2e9a3b9c8d7e6f5a4b3';
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const jwtPayload = JSON.parse(atob(token.split('.')[1]));
          userId = jwtPayload.sub || jwtPayload._id || userId;
        } catch (e) {
          console.error("Failed to decode token", e);
        }
      }
      
      const payload = {
        user: userId,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        height: formData.height,
        maritalStatus: formData.maritalStatus,
        physicalStatus: formData.physicalStatus,
        religion: formData.religion,
        caste: formData.caste,
        subcaste: formData.subcaste,
        gothra: formData.rashi, // map rashi to gothra field in backend for now, or we can just send rashi
        haveDosh: formData.haveDosh,
        location: {
          country: formData.country,
          state: formData.state,
          city: formData.city
        },
        professional: {
          education: formData.education,
          occupation: formData.occupation,
          incomeRange: formData.incomeRange,
          currency: 'INR',
          employmentType: 'Private'
        },
        familyStatus: formData.familyStatus,
        bio: formData.bio,
        idDocumentUrl: formData.idDocumentUrl,
        photos: formData.photos
      };

      const res = await fetch('http://localhost:5000/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Profile submitted successfully! Pending Admin Approval.");
        router.push('/dashboard');
      } else {
        const errorText = await res.text();
        alert(`Failed to submit profile. ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting profile.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center py-12 px-4 sm:px-6">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#a51a49]">Complete Your Profile</h2>
            <p className="text-gray-500 text-sm mt-1">Step {step} of 4</p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-[#a51a49] h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Basic Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-[#a51a49] focus:border-[#a51a49] outline-none text-gray-900">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" required name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-[#a51a49] focus:border-[#a51a49] outline-none text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                    <input type="text" name="height" placeholder="e.g. 5ft 8in" value={formData.height} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-[#a51a49] focus:border-[#a51a49] outline-none text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-[#a51a49] focus:border-[#a51a49] outline-none text-gray-900">
                      <option value="Never Married">Never Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Community & Religion</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                    <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
                    <input type="text" name="caste" value={formData.caste} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcaste</label>
                    <input type="text" name="subcaste" value={formData.subcaste} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rashi</label>
                    <input type="text" name="rashi" value={formData.rashi} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-gray-900" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Professional & Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest Education</label>
                    <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="e.g. B.Tech, MBA" className="w-full px-4 py-2 border rounded-lg text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="e.g. Software Engineer" className="w-full px-4 py-2 border rounded-lg text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
                    <input type="text" name="incomeRange" value={formData.incomeRange} onChange={handleChange} placeholder="e.g. 5-10 Lakhs" className="w-full px-4 py-2 border rounded-lg text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City of Residence</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Mumbai" className="w-full px-4 py-2 border rounded-lg text-gray-900" />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Media & KYC Verification</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About Me (Bio)</label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} placeholder="Write a few lines about yourself..." className="w-full px-4 py-2 border rounded-lg text-gray-900 resize-none"></textarea>
                </div>

                <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <label className="block text-sm font-bold text-gray-800 mb-2">Upload Profile Photo</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'photos')} className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-[#a51a49] hover:file:bg-rose-100" />
                  {formData.photos.length > 0 && <p className="text-xs text-green-600 mt-2 font-medium">Photo uploaded successfully.</p>}
                </div>

                <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <label className="block text-sm font-bold text-gray-800 mb-1">Upload Aadhaar Card / ID</label>
                  <p className="text-xs text-gray-500 mb-3">Required for verified badge.</p>
                  <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileUpload(e, 'idDocumentUrl')} className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  {formData.idDocumentUrl && <p className="text-xs text-green-600 mt-2 font-medium">ID Document attached successfully.</p>}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-4 border-t">
              <button 
                type="button" 
                onClick={() => setStep(step - 1)} 
                disabled={step === 1}
                className={`px-6 py-2 rounded-lg font-bold text-sm ${step === 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white border hover:bg-gray-50'}`}
              >
                Back
              </button>

              {step < 4 ? (
                <button 
                  type="button" 
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2 rounded-lg font-bold text-sm text-white bg-[#a51a49] hover:bg-[#851339]"
                >
                  Continue
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={submitProfile}
                  disabled={loading}
                  className="px-6 py-2 rounded-lg font-bold text-sm text-white bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Submit Profile for Verification'}
                </button>
              )}
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
