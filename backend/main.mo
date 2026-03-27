import Array "mo:core/Array";
import Int "mo:core/Int";
import List "mo:core/List";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

actor {
  // Types
  type Stream = {
    #science;
    #commerce;
    #arts;
  };

  type CollegeType = {
    #government;
    #private_;
    #deemed;
  };

  type PreferredRegion = {
    #india;
    #usa;
    #uk;
    #canada;
    #australia;
    #other;
  };

  public type Interest = {
    #engineering;
    #medicine;
    #management;
    #law;
    #arts;
  };

  public type StudentProfile = {
    stream : Stream;
    percentage : Float;
    budgetMin : Nat;
    budgetMax : Nat;
    interests : [Interest];
    preferredRegion : PreferredRegion;
    preferredCollegeType : CollegeType;
  };

  public type College = {
    id : Nat;
    name : Text;
    country : Text;
    city : Text;
    stream : Stream;
    coursesOffered : [Text];
    annualFees : Nat;
    rankingNational : Nat;
    rankingGlobal : Nat;
    eligibilityCriteria : Float;
    admissionRequirements : [Text];
    applicationDeadline : Int;
    collegeType : CollegeType;
    latitude : Float;
    longitude : Float;
  };

  public type ChatMessage = {
    role : {
      #user;
      #bot;
    };
    text : Text;
    timestamp : Int;
  };

  public type CollegeRecommendationScore = {
    college : College;
    matchScore : Nat;
  };

  // Persistent data structures
  let studentProfiles = Map.empty<Principal, StudentProfile>();
  let colleges = Map.empty<Nat, College>();
  var nextCollegeId = 0;

  type ChatBotKnowledgeBaseEntry = {
    intent : Text;
    keywords : [Text];
    response : Text;
  };

  // College related functions
  public shared ({ caller }) func addStudentProfile(profile : StudentProfile) : async () {
    studentProfiles.add(caller, profile);
  };

  // College related functions
  public shared ({ caller }) func addCollege(college : College) : async () {
    ignore caller;
    let collegeWithId = { college with id = nextCollegeId };
    colleges.add(nextCollegeId, collegeWithId);
    nextCollegeId += 1;
  };

  public query ({ caller }) func getColleges() : async [College] {
    colleges.values().toArray().sort();
  };

  module College {
    public func compare(left : College, right : College) : Order.Order {
      Text.compare(left.name, right.name);
    };
  };

  // Recommendation algorithm
  public shared ({ caller }) func getRecommendations() : async [CollegeRecommendationScore] {
    let studentProfile = switch (studentProfiles.get(caller)) {
      case (null) { Runtime.trap("No profile found for user") };
      case (?profile) { profile };
    };

    let collegesArray = colleges.values().toArray();

    func scoreCollege(college : College) : CollegeRecommendationScore {
      let streamMatch = if (college.stream == studentProfile.stream) { 40 } else {
        0;
      };
      let budgetFit = if (
        college.annualFees >= studentProfile.budgetMin and
        college.annualFees <= studentProfile.budgetMax
      ) {
        30;
      } else { 0 };
      let marksEligibility = if (studentProfile.percentage >= college.eligibilityCriteria) {
        20;
      } else { 0 };
      let regionPref = switch (studentProfile.preferredRegion) {
        case (#india) {
          if (Text.equal("India", college.country)) { 10 } else { 0 };
        };
        case (#usa) {
          if (Text.equal("USA", college.country)) { 10 } else { 0 };
        };
        case (#uk) {
          if (Text.equal("UK", college.country)) { 10 } else { 0 };
        };
        case (#canada) {
          if (Text.equal("Canada", college.country)) { 10 } else { 0 };
        };
        case (#australia) {
          if (Text.equal("Australia", college.country)) { 10 } else { 0 };
        };
        case (#other) { 10 };
      };

      let totalScore = streamMatch + budgetFit + marksEligibility + regionPref;
      { college; matchScore = totalScore };
    };

    var filteredScores = List.empty<CollegeRecommendationScore>();
    for (college in collegesArray.values()) {
      filteredScores.add(scoreCollege(college));
    };

    filteredScores.toArray().sort();
  };

  module CollegeRecommendationScore {
    public func compare(left : CollegeRecommendationScore, right : CollegeRecommendationScore) : Order.Order {
      Nat.compare(right.matchScore, left.matchScore);
    };
  };

  // College Comparison
  public query ({ caller }) func compareColleges(collegeIds : [Nat]) : async [College] {
    collegeIds.map(
      func(id) {
        switch (colleges.get(id)) {
          case (null) { Runtime.trap("College not found: " # id.toText()) };
          case (?college) { college };
        };
      }
    );
  };

  // Chatbot FAQs
  let knowledgeBase = [
    {
      intent = "fee inquiry";
      keywords = ["fees", "cost", "annual fees"];
      response = "College fees range from INR 50,000 to INR 10 Lakhs per year depending on the course and type of institution.";
    },
    {
      intent = "eligibility inquiry";
      keywords = ["eligibility", "minimum marks", "criteria"];
      response = "Most undergraduate courses require a minimum of 50% marks in the relevant stream.";
    },
    {
      intent = "document requirements";
      keywords = ["documents", "requirements", "admission"];
      response = "Typical admission documents include mark sheets, identity proof, entrance exam scores, and passport-size photographs.";
    },
    {
      intent = "application deadline";
      keywords = ["deadline", "application last date"];
      response = "Application deadlines vary by college. Most institutions have deadlines between May and July for the academic year.";
    },
    {
      intent = "course availability";
      keywords = ["courses", "available programs", "streams"];
      response = "Popular courses include engineering, medicine, management, law, and arts. Check college details for specific offerings.";
    },
    {
      intent = "ranking inquiry";
      keywords = ["ranking", "top colleges", "best"];
      response = "Rankings are based on factors like academic reputation, faculty, infrastructure, and placement records.";
    },
  ];

  // Chatbot logic
  public shared ({ caller }) func askChatBot(question : Text) : async ChatMessage {
    let lowerQuestion = question.toLower();

    // Find matching intent
    let knowledgeBaseIter = knowledgeBase.values();

    for (entry in knowledgeBaseIter) {
      for (keyword in entry.keywords.values()) {
        if (lowerQuestion.contains(#text(keyword))) {
          return {
            role = #bot;
            text = entry.response;
            timestamp = Int.abs(Time.now());
          };
        };
      };
    };

    // Fallback response
    {
      role = #bot;
      text = "Sorry, I couldn't find an answer to your question. Please be more specific.";
      timestamp = Int.abs(Time.now());
    };
  };
};
