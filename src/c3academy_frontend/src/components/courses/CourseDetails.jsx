// src/components/courses/CourseDetails.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../../context/WalletContext";
import WalletModal from "../wallet/WalletModal";

// Alamat provider kursus (kemana pembayaran dikirim)
const COURSE_PROVIDER_ADDRESS = '0x3a8d29c5DC4cBcA38C9a36726AC56065A4F7A0Fb';

// Fungsi mock untuk mendaftarkan kursus
const enrollInCourse = async (courseId, walletAddress) => {
  // Simulasi delay API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    success: true,
    courseId,
    walletAddress,
    enrollmentDate: new Date().toISOString(),
    transactionId: `enroll-${Date.now()}`
  };
};

const CourseDetails = ({ course }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Akses semua nilai dan fungsi yang diperlukan dari WalletContext
  const { 
    isConnected, 
    wallet, 
    balance, 
    makeTransaction 
  } = useContext(WalletContext) || { 
    isConnected: false, 
    wallet: null,
    balance: 0,
    makeTransaction: null
  };

  const handleEnrollClick = async () => {
    setIsEnrolling(true);

    if (!isConnected) {
      // Jika wallet tidak terhubung, buka wallet modal
      setIsWalletModalOpen(true);
      setIsEnrolling(false);
      return;
    }

    try {
      // Periksa apakah pengguna memiliki saldo yang cukup
      if (balance < course.price) {
        alert('Saldo tidak mencukupi untuk mendaftar kursus ini. Silakan tambahkan lebih banyak ICP ke wallet Anda.');
        setIsEnrolling(false);
        return;
      }

      // Gunakan makeTransaction dari WalletContext untuk mengurangi saldo
      const transactionResult = await makeTransaction(
        course.price,
        COURSE_PROVIDER_ADDRESS,
        `Pendaftaran kursus: ${course.title}`
      );
      
      if (!transactionResult || !transactionResult.success) {
        throw new Error(transactionResult?.error || 'Transaksi gagal');
      }

      // Hanya lanjutkan dengan pendaftaran jika transaksi berhasil
      const enrollmentResult = await enrollInCourse(course.id, wallet.address);
      
      if (enrollmentResult) {
        // Tambahkan ke keranjang
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        if (!cartItems.some((item) => item.id === course.id)) {
          cartItems.push(course);
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }

        // Simpan informasi pendaftaran dengan detail transaksi
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        
        // Tambahkan pendaftaran baru
        enrollments.push({
          courseId: course.id,
          course: course.title,
          walletAddress: wallet.address,
          enrollmentDate: new Date().toISOString(),
          transactionId: transactionResult.transaction.id,
          amount: course.price,
          currency: 'ICP'
        });
        
        localStorage.setItem('enrollments', JSON.stringify(enrollments));
        // Arahkan ke halaman keranjang
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error mendaftar kursus:', error);
      alert(error.message || 'Gagal mendaftar kursus. Silakan coba lagi.');
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <>
      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
        <div className="bg-gradient-to-br from-indigo-800 to-purple-700 h-60 flex items-center justify-center relative">
          <div className="text-white text-center px-4 z-10">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-200 mb-6 max-w-3xl mx-auto">
              {course.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gray-900 bg-opacity-50 rounded-md py-1 px-3 text-sm">
                <span className="font-medium">{course.rating}</span> ★ (
                {course.students} students)
              </div>
              <div className="bg-gray-900 bg-opacity-50 rounded-md py-1 px-3 text-sm">
                Created by{" "}
                <span className="font-medium">{course.instructor}</span>
              </div>
              <div className="bg-gray-900 bg-opacity-50 rounded-md py-1 px-3 text-sm">
                {course.level}
              </div>
              <div className="bg-gray-900 bg-opacity-50 rounded-md py-1 px-3 text-sm">
                {course.duration}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="p-6">
          <div className="flex border-b border-gray-700 mb-6">
            <button
              className={`py-3 px-4 font-medium text-sm ${
                activeTab === "overview"
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm ${
                activeTab === "curriculum"
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("curriculum")}
            >
              Curriculum
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm ${
                activeTab === "instructor"
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("instructor")}
            >
              Instructor
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm ${
                activeTab === "reviews"
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="text-gray-300">
              <h2 className="text-xl font-bold text-white mb-4">
                What you'll learn
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Understand the core concepts of blockchain technology
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Build decentralized applications (dApps)</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Develop smart contracts that run on blockchain</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Integrate cryptocurrency payment methods</span>
                </li>
              </ul>

              <h2 className="text-xl font-bold text-white mb-4">
                Requirements
              </h2>
              <ul className="list-disc pl-5 mb-8 space-y-2">
                <li>Basic programming knowledge</li>
                <li>Familiarity with JavaScript and React</li>
                <li>Understanding of web development concepts</li>
                <li>No prior blockchain experience required</li>
              </ul>

              <h2 className="text-xl font-bold text-white mb-4">Description</h2>
              <div className="space-y-4 mb-8">
                <p>
                  This comprehensive course will take you from blockchain basics
                  to advanced development concepts. You'll learn by building
                  real projects and gain hands-on experience with the latest
                  tools and technologies.
                </p>
                <p>
                  Starting with the fundamentals, we'll explore how blockchain
                  works, what makes it revolutionary, and why it's changing the
                  future of finance and beyond. You'll understand the
                  cryptographic principles that make blockchain secure and
                  trustless.
                </p>
                <p>
                  By the end of this course, you'll have built multiple projects
                  that showcase your blockchain development skills, including a
                  decentralized application with cryptocurrency payment
                  integration.
                </p>
              </div>

              <h2 className="text-xl font-bold text-white mb-4">
                Who this course is for
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Web developers wanting to transition to blockchain development
                </li>
                <li>
                  Entrepreneurs interested in building blockchain-based
                  businesses
                </li>
                <li>
                  Students and professionals curious about cryptocurrency and
                  Web3
                </li>
                <li>
                  Anyone interested in the future of decentralized technology
                </li>
              </ul>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">
                Course Content
              </h2>
              <div className="text-sm text-gray-400 mb-6">
                {course.chapters?.length || 0} chapters • {course.duration}{" "}
                total length
              </div>

              <div className="space-y-3">
                {course.chapters?.map((chapter, index) => (
                  <div
                    key={index}
                    className="border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-medium">
                          {index + 1}. {chapter.title}
                        </h3>
                        <div className="text-sm text-gray-400 mt-1">
                          {chapter.duration}
                        </div>
                      </div>
                      <div>
                        {chapter.preview ? (
                          <button className="text-indigo-400 text-sm flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Preview
                          </button>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "instructor" && (
            <div>
              <div className="flex items-start mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {course.instructor
                    ?.split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {course.instructor}
                  </h2>
                  <div className="text-gray-400 text-sm mb-4">
                    Blockchain Developer & Educator
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <div className="flex items-center mr-4">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      20+ Courses
                    </div>
                    <div className="flex items-center mr-4">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      100+ hours
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      4.8 Rating
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                An experienced blockchain developer with over 10 years in
                software development and 5 years specializing in distributed
                systems and cryptocurrency technologies. Passionate about
                educating the next generation of blockchain developers.
              </p>
              <p className="text-gray-300">
                Having worked with major blockchain projects and startups, the
                instructor brings real-world experience and practical knowledge
                to help students build production-ready applications and
                navigate the evolving Web3 landscape.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <div className="text-5xl font-bold text-white">
                    {course.rating}
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(course.rating)
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    Course Rating
                  </div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    // Calculating mock percentages for the rating bars
                    const percentage =
                      rating === 5
                        ? 76
                        : rating === 4
                        ? 18
                        : rating === 3
                        ? 4
                        : rating === 2
                        ? 1
                        : 1;
                    return (
                      <div key={rating} className="flex items-center mb-1">
                        <div className="text-gray-400 text-sm w-4">
                          {rating}
                        </div>
                        <svg
                          className="w-4 h-4 text-yellow-400 ml-1 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-gray-400 text-sm ml-2 w-6">
                          {percentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                {/* Mock review data */}
                {[
                  {
                    name: "Alex Thompson",
                    rating: 5,
                    date: "1 month ago",
                    comment:
                      "This course was exactly what I needed to understand blockchain development. The instructor explains complex topics in a way that makes them easy to understand. Highly recommend!",
                    avatar: "AT",
                  },
                  {
                    name: "Maria Garcia",
                    rating: 5,
                    date: "2 months ago",
                    comment:
                      "Comprehensive and practical. I now feel confident building my own blockchain applications. The projects we built throughout the course are impressive and I can add them to my portfolio.",
                    avatar: "MG",
                  },
                  {
                    name: "James Wilson",
                    rating: 4,
                    date: "3 months ago",
                    comment:
                      "Great content and well-structured. The only reason I give 4 stars instead of 5 is that some of the advanced topics could use more examples. Otherwise, excellent course!",
                    avatar: "JW",
                  },
                ].map((review, index) => (
                  <div key={index} className="border-t border-gray-700 pt-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="text-white font-medium mr-2">
                            {review.name}
                          </h3>
                          <div className="text-gray-400 text-xs">
                            {review.date}
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-600"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-900 p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold text-white">
                {course.price} {course.currency}
              </div>
              <div className="text-sm text-gray-400">
                One-time payment, lifetime access
              </div>
            </div>
            <button
              className={`bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium ${
                isEnrolling ? "opacity-75 cursor-not-allowed" : ""
              }`}
              onClick={handleEnrollClick}
              disabled={isEnrolling}
            >
              {isEnrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center text-gray-300">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Full lifetime access
            </div>
            <div className="flex items-center text-gray-300">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Access on mobile and desktop
            </div>
            <div className="flex items-center text-gray-300">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Certificate of completion
            </div>
            <div className="flex items-center text-gray-300">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              30-day money-back guarantee
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Connect Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};

export default CourseDetails;