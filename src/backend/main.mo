import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module Contact {
    public type Contact = {
      id : Nat;
      name : Text;
      email : Text;
      message : Text;
      submittedAt : Time.Time;
    };
  };

  module Blog {
    public type BlogPost = {
      id : Nat;
      title : Text;
      slug : Text;
      content : Text;
      author : Text;
      publishedDate : Time.Time;
      isPublished : Bool;
    };
  };

  module MCQ {
    public type MCQ = {
      id : Nat;
      systemId : Nat;
      question : Text;
      optionA : Text;
      optionB : Text;
      optionC : Text;
      optionD : Text;
      correctOption : Text;
      explanation : Text;
    };
  };

  module BodySystem {
    public type BodySystem = {
      id : Nat;
      name : Text;
      slug : Text;
      description : Text;
      structureText : Text;
      functionText : Text;
      neetPoints : Text;
      commonDisorders : Text;
      diagramUrl : ?Text;
    };

    public func compareByName(a : BodySystem, b : BodySystem) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  let contactSubmissions = Map.empty<Nat, Contact.Contact>();
  let blogPosts = Map.empty<Nat, Blog.BlogPost>();
  let mcqs = Map.empty<Nat, MCQ.MCQ>();
  let bodySystems = Map.empty<Nat, BodySystem.BodySystem>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextContactId = 0;
  var nextBlogPostId = 0;
  var nextMCQId = 0;
  var nextBodySystemId = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact Form Submissions
  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    let contact = {
      id = nextContactId;
      name;
      email;
      message;
      submittedAt = Time.now();
    };
    contactSubmissions.add(nextContactId, contact);
    nextContactId += 1;
  };

  public query ({ caller }) func getAllContacts() : async [Contact.Contact] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray();
  };

  // Blog Posts CRUD
  public shared ({ caller }) func createBlogPost(title : Text, slug : Text, content : Text, author : Text, isPublished : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };

    let blogPost = {
      id = nextBlogPostId;
      title;
      slug;
      content;
      author;
      publishedDate = Time.now();
      isPublished;
    };
    blogPosts.add(nextBlogPostId, blogPost);
    nextBlogPostId += 1;
  };

  public shared ({ caller }) func updateBlogPost(id : Nat, title : Text, slug : Text, content : Text, author : Text, isPublished : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };

    switch (blogPosts.get(id)) {
      case (null) {
        Runtime.trap("Blog post not found");
      };
      case (?existingPost) {
        let updatedPost = {
          existingPost with
          title;
          slug;
          content;
          author;
          isPublished;
        };
        blogPosts.add(id, updatedPost);
      };
    };
  };

  public shared ({ caller }) func deleteBlogPost(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };

    switch (blogPosts.get(id)) {
      case (null) {
        Runtime.trap("Blog post not found");
      };
      case (_) {
        blogPosts.remove(id);
      };
    };
  };

  public query func getAllBlogPosts() : async [Blog.BlogPost] {
    blogPosts.values().toArray();
  };

  // MCQs CRUD
  public shared ({ caller }) func createMCQ(systemId : Nat, question : Text, optionA : Text, optionB : Text, optionC : Text, optionD : Text, correctOption : Text, explanation : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create MCQs");
    };

    let mcq = {
      id = nextMCQId;
      systemId;
      question;
      optionA;
      optionB;
      optionC;
      optionD;
      correctOption;
      explanation;
    };
    mcqs.add(nextMCQId, mcq);
    nextMCQId += 1;
  };

  public shared ({ caller }) func updateMCQ(id : Nat, systemId : Nat, question : Text, optionA : Text, optionB : Text, optionC : Text, optionD : Text, correctOption : Text, explanation : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update MCQs");
    };

    switch (mcqs.get(id)) {
      case (null) {
        Runtime.trap("MCQ not found");
      };
      case (?existingMCQ) {
        let updatedMCQ = {
          existingMCQ with
          systemId;
          question;
          optionA;
          optionB;
          optionC;
          optionD;
          correctOption;
          explanation;
        };
        mcqs.add(id, updatedMCQ);
      };
    };
  };

  public shared ({ caller }) func deleteMCQ(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete MCQs");
    };

    switch (mcqs.get(id)) {
      case (null) {
        Runtime.trap("MCQ not found");
      };
      case (_) {
        mcqs.remove(id);
      };
    };
  };

  public query func getAllMCQs() : async [MCQ.MCQ] {
    mcqs.values().toArray();
  };

  // Body Systems CRUD
  public shared ({ caller }) func createBodySystem(name : Text, slug : Text, description : Text, structureText : Text, functionText : Text, neetPoints : Text, commonDisorders : Text, diagramUrl : ?Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create body systems");
    };

    let bodySystem = {
      id = nextBodySystemId;
      name;
      slug;
      description;
      structureText;
      functionText;
      neetPoints;
      commonDisorders;
      diagramUrl;
    };
    bodySystems.add(nextBodySystemId, bodySystem);
    nextBodySystemId += 1;
  };

  public shared ({ caller }) func updateBodySystem(id : Nat, name : Text, slug : Text, description : Text, structureText : Text, functionText : Text, neetPoints : Text, commonDisorders : Text, diagramUrl : ?Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update body systems");
    };

    switch (bodySystems.get(id)) {
      case (null) {
        Runtime.trap("Body system not found");
      };
      case (?existingSystem) {
        let updatedSystem = {
          existingSystem with
          name;
          slug;
          description;
          structureText;
          functionText;
          neetPoints;
          commonDisorders;
          diagramUrl;
        };
        bodySystems.add(id, updatedSystem);
      };
    };
  };

  public shared ({ caller }) func deleteBodySystem(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete body systems");
    };

    switch (bodySystems.get(id)) {
      case (null) {
        Runtime.trap("Body system not found");
      };
      case (_) {
        bodySystems.remove(id);
      };
    };
  };

  public query func getAllBodySystems() : async [BodySystem.BodySystem] {
    bodySystems.values().toArray().sort(BodySystem.compareByName);
  };

  public query func getBodySystemsByStructure() : async [BodySystem.BodySystem] {
    bodySystems.values().toArray();
  };

  public query func getBodySystemsByFunction() : async [BodySystem.BodySystem] {
    bodySystems.values().toArray();
  };

  public query func getBodySystemsByDisorder() : async [BodySystem.BodySystem] {
    bodySystems.values().toArray();
  };
};
